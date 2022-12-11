import fs from 'fs'

const data = fs.readFileSync('test.txt', 'utf-8').split('\n')

const signalStrength = (cycles) => {
  let currentCycle = 0
  let registerValue = 1
  let cycleIndex = 0
  let pixels = ''
  do {
    if (data[cycleIndex] === 'noop') {
      currentCycle++
      cycleIndex++
      continue
    }

    // If there are only 2 or less cycles remaining break here because the next
    // lines will complete another cycle.
    if (cycles - currentCycle <= 2) {
      break
    }
    const step = parseInt(data[cycleIndex].split(' ')[1])
    registerValue += step
    currentCycle += 2
    cycleIndex++
    
  } while (currentCycle <= cycles || cycleIndex === data.length - 1)
  return {strength: registerValue * cycles, pixels}
  
}

const totalSignalStrength = signalStrength(20).strength + signalStrength(60).strength + signalStrength(100).strength + signalStrength(140).strength + signalStrength(180).strength + signalStrength(220).strength 
console.log('The total signal strength is:', totalSignalStrength)

