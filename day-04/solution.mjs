import fs from 'fs'

const assignments = (fs.readFileSync('assignments.txt', 'utf8')).split('\n')
let pairsPart1 = 0
let pairsPart2 = 0

assignments.forEach((assignment, index) => {
  const schedulePair = assignment.split(',')
  const schedule1 = schedulePair[0].split('-').map(value => parseInt(value))
  const schedule2 = schedulePair[1].split('-').map(value => parseInt(value))
  
  // does 1 fit into 2 or 2 fit into 1?
  if ((schedule1[0] <= schedule2[0] && schedule1[1] >= schedule2[1])
    || (schedule2[0] <= schedule1[0] && schedule2[1] >= schedule1[1])) {
      pairsPart1 +=1
      pairsPart2 +=1
      return
  }

  // if they aren't fully overlapping, do they overlap at all?
  if ((schedule1[0] <= schedule2[0] && (schedule1[1] >= schedule2[0]))
    || schedule2[0] <= schedule1[0] && schedule2[1] >= schedule1[0]) {
      pairsPart2 +=1
  }
})

console.log('The number of fully overlapping assignments is:', pairsPart1)
console.log('The number assignments with any overlap at all is:', pairsPart2)

