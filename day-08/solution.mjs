import fs from 'fs'

const forestBlock = fs.readFileSync('forest.txt', 'utf-8').split('\n').map((row) => row.split(''))
const rows = forestBlock.length
const cols = forestBlock[0].length
let visibilityArray = []

const handleInteriorTree = (row, col) => {
  const treeHeight = forestBlock[row][col]
  // look up
  let up = 'v'
  for (let u = row - 1; u >= 0; u-- ) {
    if (forestBlock[u][col] >= treeHeight) {
      up = 'h'
    }
  }
  // look down
  let down = 'v'
  for (let d = row + 1; d < rows; d++ ) {
    if (forestBlock[d][col] >= treeHeight) {
      down = 'h'
    }
  }
  
  // look left
  let left = 'v'
  for (let l = col - 1; l >= 0; l--) {
    if (forestBlock[row][l] >= treeHeight) {
      left = 'h'
    }
  }
  // look right
  let right = 'v'
  for (let r = col + 1; r < cols; r++) {   
    if (forestBlock[row][r] >= treeHeight) {
      right = 'h'
    }
  }

  if (up === 'h' && down === 'h' && left === 'h' && right === 'h') {
    return 'h'
  }
  return 'v'
}

for (let row = 0; row < rows; row++){
  visibilityArray.push([])
  for (let col = 0; col < cols; col++) {


    // Set perimeter values to be visible
    if (row === 0 || col === 0 || row === rows - 1 || col === cols -1) {
      visibilityArray[row][col] = 'v'
      continue
    }

    // handle interior values
    if (handleInteriorTree(row, col) === 'v') {
      visibilityArray[row][col] = 'v'
      continue
    }

    visibilityArray[row][col] = 'h'
  
  }
}
const numberVisible = visibilityArray.flatMap((val)=> val).sort().reverse().indexOf('h')
console.log('The number of visible trees is:', numberVisible)
