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
      return prioritize(sack1[i])
    }
  }
}

// Accepts an array of three ruck sacks
// Returns the priority value for the item found in all three sacks
const findBadge = (ruckSacks) => {
  const sack1 = ruckSacks[0]
  const sack2 = ruckSacks[1]
  const sack3 = ruckSacks[2]
  for (let i = 0; i < sack1.length; i++) {
    if (sack2.includes(sack1[i]) && sack3.includes(sack1[i])) {
      return prioritize(sack1[i])
    }
  }
}

const totalPart1 = ruckSackArray.reduce((total, currentValue) => {
  return total + findDuplicatePriority(currentValue)
}, 0)

let totalPart2 = 0
for (let i = 0; i < ruckSackArray.length; i += 3) {
  totalPart2 += findBadge([ruckSackArray[i], ruckSackArray[i + 1], ruckSackArray[i + 2]])
}

console.log('This sum of priorities of the duplicate items is:', totalPart1)
console.log('This sum of priorities of the badges is:', totalPart2)