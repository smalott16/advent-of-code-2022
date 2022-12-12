import fs from 'fs'

const data = fs.readFileSync('test.txt', 'utf-8').split('\n\n').map(i => i.split('\n'))

class Monkey  {
  constructor (name, startingItems, operation, divisibleTest, passToIfTrue, passToIfFalse, itemCount) {
    this.name = name
    this.startingItems = startingItems
    this.operation = operation
    this.divisibleTest = divisibleTest
    this.passToIfTrue = passToIfTrue
    this.passToIfFalse = passToIfFalse
    this.itemCount = itemCount
  }
  throwItem() {
    this.startingItems = this.startingItems.slice(1)
  }
  catchItem(item) {
    this.startingItems.push(item)
  }
  addInspectCount() {
    this.itemCount++
  }

}
// Parse Monkey List into something useful.
const monkeySummary = []
data.forEach((monkey, index) => {
  const startingItems = monkey[1].split(':')[1].split(',').map(i => BigInt(i.trim()))
  const operation = monkey[2].split('=')[1].split(' ').slice(1)
  const trueTest = BigInt(monkey[4].split('monkey')[1].trim())
  const falseTest = BigInt(monkey[5].split('monkey')[1].trim())
  const divisibleTest = BigInt(monkey[3].split('by')[1].trim())
  monkeySummary.push(new Monkey(
    index,
    startingItems,
    operation,
    divisibleTest,
    trueTest,
    falseTest,
    0
  ))
})

const playRound = (startingSummary, numberOfRounds, worryFactor) => {
  for (let i = 0; i < numberOfRounds; i++) {
    // Analyze Each Monkey
    startingSummary.forEach((monkey) => {
      monkey.startingItems.forEach((item) => {
        monkey.addInspectCount()
        // Determine if the operation takes place against itself or the value from the array
        const operand = monkey.operation[2] === 'old' ? item : BigInt(monkey.operation[2])
        let worryLevel = item
        switch (monkey.operation[1]) {
          case ('+'):
            worryLevel = (worryLevel + operand) / worryFactor
            break
          case ('*'):
            worryLevel = (worryLevel * operand) / worryFactor
          break
        }
        monkey.throwItem()
        let passTo = BigInt(0)
        if (!(worryLevel % monkey.divisibleTest)) {
          // pass to if true
          passTo = monkey.passToIfTrue
          monkeySummary[passTo].catchItem(worryLevel)
          return
        }
        // pass to if false
        passTo = monkey.passToIfFalse
        monkeySummary[passTo].catchItem(worryLevel)
      })

    })
  }
  
}

playRound(monkeySummary, 10000, BigInt(1))

const itemCountSummary = monkeySummary.map(monkey => monkey.itemCount).sort((a,b) => b - a)
console.log('This product of the two largest numbers is:', itemCountSummary[0] * itemCountSummary[1])