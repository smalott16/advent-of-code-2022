import fs from 'fs'

const data = fs.readFileSync('supply-stacks.txt', 'utf-8').split('\n\n')

const stacks = data[0].split('\n')
const instructions = data[1].split('\n').map((instruction) => {
  return instruction.replace(/move|from|to/g, '').trim().split('  ')
})
stacks.pop()

// Strip out square brackets and reverse the order
const rows = stacks.map(substring => substring.replace(/[\[\]']+/g,' ')).reverse()

let transposedStacks = []
rows.forEach((row) => {
  for (let i = 0; i < row.length; i++) {
    if (!transposedStacks[i]) {
      transposedStacks[i]= [row[i]]
      continue
    }
    if (row[i] !== ' ')
    transposedStacks[i].push(row[i])
  }
})

// Clean up empty arrays
let cleanStacks = []
transposedStacks.forEach((stack) => {
  if (stack[0] !== ' ') {
    cleanStacks.push(stack)
  }
})

console.log(instructions)