import fs from 'fs'

const data = fs.readFileSync('supply-stacks.txt', 'utf-8').split('\n\n')

const stacks = data[0].split('\n')
stacks.pop() // pop off row of numbers

// Strip out unnecessary words from instructions
// [# of blocks moved, from column, to column]
const instructions = data[1].split('\n').map((instruction) => {
  return instruction.replace(/move|from|to/g, '').trim().split('  ')
})

// Strip out square brackets and reverse the order
const rows = stacks.map(substring => substring.replace(/[\[\]']+/g,' ')).reverse()

// Create ordered arrays of stacks
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

// Strip out arrays containing blank strings
let cleanStacks = []
transposedStacks.forEach((stack) => {
  if (stack[0] !== ' ') {
    cleanStacks.push(stack)
  }
})

// Move the blocks around
const cleanStacksPart1 = cleanStacks.map((stack) => [...stack])
const cleanStacksPart2 = cleanStacks.map((stack) => [...stack])
instructions.forEach((instruction) => {
  const numberMoved = parseInt(instruction[0])
  const stackFrom = parseInt(instruction[1])
  const stackTo = parseInt(instruction[2])
  for (let i = 0; i < numberMoved; i++) {
    cleanStacksPart1[stackTo - 1].push(cleanStacksPart1[stackFrom -1].pop())
  }

  const movedStack = cleanStacksPart2[stackFrom -1].splice(cleanStacksPart2[stackFrom -1].length - numberMoved)
  for (let j = 0; j < movedStack.length; j++) {
    cleanStacksPart2[stackTo -1].push(movedStack[j])
  }
})

// Grab last letter on each stack
let topOfStackPart1 = ''
let topOfStackPart2 = ''
cleanStacksPart1.forEach((stack) => {
  topOfStackPart1 += stack.pop()
})
cleanStacksPart2.forEach((stack) => {
  topOfStackPart2 += stack.pop()
})

console.log('The top letter on each stack is:', topOfStackPart1)
console.log('The top letter on each stack is:', topOfStackPart2)