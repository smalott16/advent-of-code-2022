import { Console } from 'console'
import fs from 'fs'

const commandLog = (fs.readFileSync('commands.txt', 'utf-8')).split('\n')

// give a unique identifier to all directories

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

// Build Directory Strucutre
let history = []
const directories = {}
commandLog.forEach((cmd, index) => {
  
  if (cmd.includes('$ cd') && !cmd.includes('..')) {
    const dirName = cmd.split(' ').pop()
    const uniqueDirName = `${dirName}${history.join('')}`
    history.push(uniqueDirName)
    directories[uniqueDirName] = new Directory(uniqueDirName)
  }
  if (cmd === '$ cd ..') {
    history.pop()
  }
  const currentDir = history[history.length - 1] 
  
  // if cmd includes dir then add directory to directories
  if (cmd.includes('dir')) {
    const dirNameAdd = cmd.split(' ').pop()
    //directories[currentDir].addDirectory(new Directory(dirNameAdd))
    directories[currentDir].addDirectory(`${dirNameAdd}${history.join('')}`)
  }
  // if cmd includes a number then add it to files
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

const directoryNames = Object.keys(directories)
// Update directory file size property
directoryNames.forEach((key) => {
  directories[key].calculateFileSize()
})

// Recursion function to calculate directory size
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

// Calculate cumulative of directories containing 100k or less
let cumulativeSize = 0
directoryNames.forEach((subDir) => {
  const size = deeplyCalculateDirectorySize(directories[subDir])
  directories[subDir].directorySize = size
  if (size <= 100000) {
    cumulativeSize += size
  } 
})
console.log(cumulativeSize)

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