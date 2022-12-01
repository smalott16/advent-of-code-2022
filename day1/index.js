const fs = require('fs')

fs.readFile('calories.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  
  // convert the buffer into an array of calories for each elf
  // [[elf1], [elf2], [elfn]]
  const calories = (data.split('\n\n').map((substring) => {
    const initialValue = 0
    return substring.split('\n').reduce((total, current) => {
      return total + parseInt(current)
    }, initialValue)
  }))

  // sort the array from high to low
  calories.sort((a,b) => b - a)
  const max = calories [0]
  console.log(`The max is ${max}`)

  // Grab the top three and sum them up
  const top3Sum = calories.slice(0,3).reduce((total, current) => {
    return total + current
  })
  console.log(`The top three elves:`, top3Sum)
})
