import fs from 'fs'

const forestBlock = fs.readFileSync('test.txt', 'utf-8').split('\n').map((row) => row.split(''))
const rows = forestBlock.length
const cols = forestBlock[0].length
let visibilityArray = []
let scenicScoreArray = []

const findVisibility = (row, col) => {
  const treeHeight = forestBlock[row][col]
  // look up
  let up = 'v'
  let treesUp = 0
  for (let u = row - 1; u >= 0; u-- ) {
    treesUp++  
    if (forestBlock[u][col] >= treeHeight) {
      up = 'h'
      break
    }
  }
  // look down
  let down = 'v'
  let treesDown = 0
  for (let d = row + 1; d < rows; d++ ) {
    treesDown++
    if (forestBlock[d][col] >= treeHeight) {
      down = 'h'
      break
    }
  }
  
  // look left
  let left = 'v'
  let treesLeft = 0
  for (let l = col - 1; l >= 0; l--) {
    treesLeft++
    if (forestBlock[row][l] >= treeHeight) {
      left = 'h'
      break
    }
  }
  // look right
  let right = 'v'
  let treesRight = 0
  for (let r = col + 1; r < cols; r++) {  
    treesRight++ 
    if (forestBlock[row][r] >= treeHeight) {
      right = 'h'
      break
    }
  }
  const scenicScore = treesUp * treesDown * treesLeft * treesRight
  
  if (up === 'h' && down === 'h' && left === 'h' && right === 'h') {
    return {visibility: 'h', scenicScore}
  }
  return {visibility: 'v', scenicScore}
}

for (let row = 0; row < rows; row++){
  visibilityArray.push([])
  scenicScoreArray.push([])
  for (let col = 0; col < cols; col++) {
    const visibilitySummary = findVisibility(row, col)
    
    scenicScoreArray[row][col] = visibilitySummary.scenicScore
    if (visibilitySummary.visibility === 'v') {
      visibilityArray[row][col] = 'v'
      continue
    }
    visibilityArray[row][col] = 'h'
  
  }
}

const numberVisible = visibilityArray.flatMap((val)=> val).sort().reverse().indexOf('h')
console.log('The number of visible trees is:', numberVisible)

// const highestScenicScore = scenicScoreArray.flatMap(val => val).sort().reverse()[0]
// console.log(highestScenicScore)
console.log(scenicScoreArray)
console.log(findVisibility(3, 2))