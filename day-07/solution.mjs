import fs from 'fs'

const commandLog = (fs.readFileSync('test.txt', 'utf-8')).split('\n')
class Directory {
  constructor (name) {
    this.name = name
    this.files = []
    this.directories = []
    this.directorySize = undefined
  }
  addFile({ name, size }) {
    this.files.push({name, size})
  }
  addDirectory(directory) {
    this.directories.push(directory)
  }
}

// Build Directory Strucutre
let history = []
const directories = {}
commandLog.forEach((cmd) => {
  if (cmd.includes('$ cd') && !cmd.includes('..')) {
    const dirName = cmd.split(' ').pop()
    history.push(dirName)
    directories[dirName] = new Directory(dirName)
  }
  if (cmd === '$ cd ..') {
    history.pop()
  }
  const currentDir = history[history.length - 1] 
  
  // if cmd includes dir then add directory to directories
  if (cmd.includes('dir')) {
    const dirNameAdd = cmd.split(' ').pop()
    //directories[currentDir].addDirectory(new Directory(dirNameAdd))
    directories[currentDir].addDirectory(dirNameAdd)
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

console.log(directories['e'].directories)


