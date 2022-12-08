import { Console } from 'console'
import fs from 'fs'

const commandLog = (fs.readFileSync('commands.txt', 'utf-8')).split('\n')

// Each directory will be its own instance
class Directory {
  constructor (name) {
    this.name = name
    this.files = []
    this.directories = []
    this.fileSize = undefined
    this.directorySize = undefined
  }
  addFile({ name, size }) {
    this.files.push({name, size})
  }
  addDirectory(directory) {
    this.directories.push(directory)
  }
  calculateFileSize() {
    const files = this.files.reduce((total, currentVal) => {
      return total + currentVal.size
    },0)
    this.fileSize = files
  }
}

// Loop through all cmd line i/o entries and create directory objects
let history = []
const directories = {}
commandLog.forEach((cmd) => {
  // If entering a directory, create a new instance for that directory
  // Update the history to keep track of the current directory
  if (cmd.includes('$ cd') && !cmd.includes('..')) {
    const dirName = cmd.split(' ').pop()
    const uniqueDirName = `${dirName}${history.join('')}` // give a unique identifier to each directory
    history.push(uniqueDirName)
    directories[uniqueDirName] = new Directory(uniqueDirName)
  }

  // If exiting a directory, update the history
  if (cmd === '$ cd ..') {
    history.pop()
  }
  const currentDir = history[history.length - 1] 
  
  // If cmd includes dir then it must be a directory - add it to the current directory's subdirectory list
  if (cmd.includes('dir')) {
    const dirNameAdd = cmd.split(' ').pop()
    //directories[currentDir].addDirectory(new Directory(dirNameAdd))
    directories[currentDir].addDirectory(`${dirNameAdd}${history.join('')}`)
  }

  // If cmd line includes a number it must be a file - add it to the current directory file list
  if (!cmd.includes('dir') && !cmd.includes('$')) {
    const fileProperties = cmd.split(' ')
    const fileSize = fileProperties[0]
    const fileName = fileProperties[1]
    directories[currentDir].addFile({
      name: fileName,
      size: parseInt(fileSize)
    })
  }
})

// Calculate the total memory of files directly in each directory
const directoryNames = Object.keys(directories)
// Update directory file size property
directoryNames.forEach((key) => {
  directories[key].calculateFileSize()
})

// Recursion function to calculate memory stored in current directory and all child directories. 
function deeplyCalculateDirectorySize (directory) {
  let total = directory.fileSize

  if (directory.directories.length > 0) {
    directory.directories.forEach((subDir) => {
      const subDirFileSize = deeplyCalculateDirectorySize(directories[subDir])
      total += subDirFileSize
    })
  }
  
  return total
}

// Calculate sum of size of directories containing 100k or less
let cumulativeSize = 0
directoryNames.forEach((subDir) => {
  const size = deeplyCalculateDirectorySize(directories[subDir])
  directories[subDir].directorySize = size
  if (size <= 100000) {
    cumulativeSize += size
  } 
})
console.log(cumulativeSize)

// Calculate the smallest directory you would need to remove to free up the required space. 
const remainingMemory = 70000000 - directories['/'].directorySize
const requiredFreeSpace = 30000000 - remainingMemory
console.log('Remaining Memory:', remainingMemory, 'Required Free Space:', requiredFreeSpace)

let smallestViableDirectory = 70000000
directoryNames.forEach((subDir) => {
  if (directories[subDir].directorySize >= requiredFreeSpace
    && directories[subDir].directorySize < smallestViableDirectory) 
  {
    smallestViableDirectory=directories[subDir].directorySize
  }
      
})
console.log(smallestViableDirectory)