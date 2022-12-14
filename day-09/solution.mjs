import fs from 'fs'

const movements = fs.readFileSync('movements.txt', 'utf-8').split('\n').map(m => m.split(' '))
let tailHistory = [[0,0]]
let headHistory = [[0,0]]

// current is the current position as an array [x, y]
// returns an array of stringified array keys 'x-y'[]
export const touchingPositions = (current) => {
  const up = [current[0] + 1, current[1]]
  const down = [current[0] - 1, current[1]]
  const left = [current[0], current[1] - 1]
  const right = [current[0], current[1] + 1]
  const upRight = [current[0] + 1, current[1] + 1]
  const upLeft = [current[0] - 1, current[1] + 1]
  const downRight = [current[0] + 1, current[1] - 1]
  const downLeft = [current[0] - 1, current[1] - 1]
  return [current, up, down, left, right, upRight, upLeft, downRight, downLeft].map((a) => a.join('_'))
}

// Starting position is an array of [x, y]
// Movement is an array of [direction, size]
const steps = (startingHead, startingTail, movement) => {
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
    
    headHistory.push([newXHead, newYHead])
    
    if (!(touchingPositions([...startingTail]).includes([newXHead, newYHead].join('_')))) {
      tailHistory.push([...headHistory[headHistory.length - 2]])
    }
  }
  
}

movements.forEach(movement => {
  const startingHead = [...headHistory[headHistory.length - 1]]
  const startingTail = [...tailHistory[tailHistory.length -1]]
  steps(startingHead, startingTail, movement)
  
})

// Find unique spaces in tail history
const tailHistoryMap = new Set(tailHistory.map(position => position.join('_')))
console.log('This number of positions the tail visited is:', tailHistoryMap.size)

