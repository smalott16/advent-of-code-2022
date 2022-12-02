import { readFile } from 'node:fs/promises'

/**
 * Challenger A = Rock, B = Paper, C = Scissors
 * Response X = Rock, Y = Paper, Z = Scissors 
 */
async function getDataAsArray () {
  try {
    const data = await readFile('strategy-guide.txt', 'utf-8')
    return data.split('\n').map(substring => substring.split(' '))
  } catch (err) {
    console.error(err)
  }
}

function getScore (gameArray) {
  const shapeSummary = {
    'X': {
      score: 1,
      beats: 'C',
      ties: 'A'
    },
    'Y': {
      score: 2,
      beats: 'A',
      ties: 'B'
    },
    'Z': {
      score: 3,
      beats: 'B',
      ties: 'C'
    }
  }
  
  const opponent = gameArray[0]
  const me = gameArray[1]
  const baseScore = shapeSummary[`${me}`].score
  // is win?
  if (shapeSummary[`${me}`].beats === opponent) {
    return 6 + baseScore
  }
  // is tie?
  if (shapeSummary[`${me}`].ties === opponent) {
    return 3 + baseScore
  }
  // isnt a win or a tie
  return 0 + baseScore
  
}

const rpsGames = await getDataAsArray()
const finalScore = rpsGames.reduce((total, currentValue) => {
  return total + getScore(currentValue)
}, 0)
console.log(finalScore)