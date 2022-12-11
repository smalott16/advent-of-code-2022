import fs from 'fs'

const data = fs.readFileSync('test.txt', 'utf-8').split('\n')

const isWithinSprite = (cycle, spritePosition) => {
  if (cycle < spritePosition - 1 || cycle > spritePosition + 1) {
    return false
  }
  return true
}

const signalStrength = (cycles) => {
  let currentCycle = 0
  let registerValue = 1
  let spritePosition = 1
  let cycleIndex = 0
  let pixels = ''
  do {
    // If the cycle is at the start of a new row, reset the sprite
    if ([0,40,80,120,160,200].some((val) => val === currentCycle)) {
      pixels = ''
      spritePosition = currentCycle + 1
    }

    if (data[cycleIndex] === 'noop') {
      pixels = pixels + (isWithinSprite(currentCycle, spritePosition) ? '#' : '.')
      currentCycle++
      cycleIndex++
      continue
    }

    // If there are only 2 or less cycles remaining break here because the next
    // lines will complete another cycle.
    if (cycles - currentCycle <= 2) {
      pixels = pixels + (isWithinSprite(currentCycle, spritePosition) ? '#' : '.')
      break
    }
    pixels = pixels + (isWithinSprite(currentCycle, spritePosition) ? '#' : '.')
    pixels = pixels + (isWithinSprite(currentCycle + 1, spritePosition) ? '#' : '.')
    const step = parseInt(data[cycleIndex].split(' ')[1])
    registerValue += step
    spritePosition += step
    currentCycle += 2
    cycleIndex++
    
  } while (currentCycle <= cycles || cycleIndex === data.length - 1)
  return {strength: registerValue * cycles, pixels}
  
}

const totalSignalStrength = signalStrength(20).strength + signalStrength(60).strength + signalStrength(100).strength + signalStrength(140).strength + signalStrength(180).strength + signalStrength(220).strength 
console.log('The total signal strength is:', totalSignalStrength)

