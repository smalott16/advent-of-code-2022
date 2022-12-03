import fs from 'fs'

// create an array of ruck sacks. Each sach is also represented by an array of compartments
const ruckSackArray = fs.readFileSync('ruck-sacks.txt', 'utf-8').split('\n')

const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const prioritize = (item) => items.indexOf(item) + 1

// Accepts the string representing each ruck sack
// Returns the priority value of the item found in both sacks.
const findDuplicatePriority = (ruckSack) => {
  // break into two strings
  const sack1 = ruckSack.slice(0, ruckSack.length/2 )
  const sack2 = ruckSack.slice(ruckSack.length / 2)
  // Loop through first sack and find the duplicate located in the second sack.
  for (let i = 0; i < sack1.length; i++) {
    if (sack2.includes(sack1[i])) {
      return sack1[i], prioritize(sack1[i])
    }
  }
}

const totalPart1 = ruckSackArray.reduce((total, currentValue) => {
  return total + findDuplicatePriority(currentValue)
}, 0)
console.log('This sum of priorities of the duplicate items is:', totalPart1)