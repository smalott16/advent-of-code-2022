import fs from 'fs'

const rawSignal = fs.readFileSync('signal.txt', 'utf8')

/**
 * Function that looks for first occurence of unique values
 * @param {*} size is the number of unique values
 * @returns the index position where the prev <size> values (inclusive) are unique
 */
const signalFinder = (size) => {
  for (let i = size - 1; i < rawSignal.length; i++) {
    const marker = rawSignal.slice((i - size + 1),(i + 1)).split('')
    const markerSet = new Set(marker)
    if (markerSet.size === size) {
      return i + 1
    }
  }
  
}

console.log('The first marker position is:', signalFinder(4))
console.log('The second marker position is:', signalFinder(14))