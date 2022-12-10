import fs from 'fs'
import { touchingPositions } from './solution.mjs'

const movements = fs.readFileSync('test.txt', 'utf-8').split('\n').map(m => m.split(' '))

const knotLocations = [[[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]], [[0,0]]]
// Starting position is an array of [x, y]
// Movement is an array of [direction, size]
const stepHead = (startingHead, movement) => {
  const direction = movement[0]
  let newXHead = startingHead[0]
  let newYHead = startingHead[1]
  for (let i = 0; i < parseInt(movement[1]); i++) {
    switch (direction) {
      case 'R':
        newXHead++
        break
      case 'L':
        newXHead--
        break
      case 'U':
        newYHead++
        break
      case 'D':
        newYHead--
        break
    }
    knotLocations[0].push([newXHead, newYHead])

    stepTail([newXHead, newYHead], 1)
  }
  
}

// Recursively call this baddy
const stepTail = (headPosition, knotIndex) => {
  const nextKnotPosition = [...knotLocations[knotIndex][knotLocations[knotIndex].length - 1]]
  if (!(touchingPositions(nextKnotPosition).includes(headPosition.join('_')))) {
    // Move knots 2 through 9 to mimic same movement as the previous knot
    if (knotIndex > 1) {
      // find how previous knot moved
      
    }
    
    // Move the first knot to the previous head position
    const previousHeadPosition = [...knotLocations[knotIndex - 1][knotLocations[knotIndex - 1].length - 2]]
    knotLocations[knotIndex].push(previousHeadPosition)
    

  }
  if (knotIndex < knotLocations.length - 1) {
    stepTail(knotLocations[knotIndex][knotLocations[knotIndex].length -1], knotIndex + 1)
  }
}


movements.forEach((movement) => {
  const startingHead = [...knotLocations[0][knotLocations[0].length - 1]]
  stepHead(startingHead, movement)
})
console.log(knotLocations)
const tailHistoryMap = new Set(knotLocations[1].map(position => position.join('_')))
console.log('This number of positions the tail visited is:', tailHistoryMap.size)
