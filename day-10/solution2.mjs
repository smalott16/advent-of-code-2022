import fs from 'fs'

const data = fs.readFileSync('test.txt', 'utf-8').split('\n')

const isWithinSprite = (cycle, spritePosition) => {
  if (cycle < spritePosition - 1 || cycle > spritePosition + 1) {
    return false
  }
  return true
}

const signalStrength = (cycles) => {
  let currentCycle = 1
  let spritePosition = 1
  let cycleIndex = 0
  let pixels = ''
  do {
    //If the cycle is at the start of a new row, reset the sprite
    if ([40,80,120,160,200].some((val) => val === currentCycle)) {
      pixels += '\n'
      spritePosition = currentCycle + 1
    }
    
    if (data[cycleIndex] === 'noop') {
      console.log(`Start cycle ${currentCycle}: begin executing ${data[cycleIndex]}`)
      pixels = pixels + (isWithinSprite(currentCycle-1, spritePosition) ? '#' : '.')
      console.log(`During cycle ${currentCycle}: CRT draws pixel in position ${pixels.length -1}`)
      console.log(`Current CRT row: ${pixels}`)
      currentCycle++
      cycleIndex++
      continue
    }
    
    // Do something in the first cycle
    console.log(`Start Cycle ${currentCycle}: begin executing ${data[cycleIndex]}`)
    pixels = pixels + (isWithinSprite(currentCycle-1, spritePosition) ? '#' : '.')
    console.log(`During cycle ${currentCycle}: CRT draws pixel in position ${pixels.length -1}`)
    console.log(`Current CRT row: ${pixels}`)
    // Complete first cycle
    currentCycle++
    // Check if we have hit our cycles limit
    if (currentCycle % 40 === 0) {
      continue
    }
    if (currentCycle >= cycles) {
      break
    }
    // Do something in the second cycle
    pixels = pixels + (isWithinSprite(currentCycle-1, spritePosition) ? '#' : '.')
    console.log('current position', currentCycle, spritePosition)
    console.log(`During cycle ${currentCycle}: CRT draws pixel in position ${pixels.length -1}`)
    console.log(`Current CRT row: ${pixels}`)
    console.log(`End of cycle: ${currentCycle}: finish executing ${data[cycleIndex]}`)
    const step = parseInt(data[cycleIndex].split(' ')[1])
    spritePosition += step
    console.log(`Sprite position: ${spritePosition}`)
    currentCycle++
    cycleIndex++
    
    
  } while (currentCycle < cycles || cycleIndex === data.length - 1)
  return pixels
  
}

console.log(signalStrength(120))

