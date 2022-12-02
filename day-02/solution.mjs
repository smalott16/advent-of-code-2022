import { readFile } from 'node:fs/promises'

/**
 * Challenger A = Rock, B = Paper, C = Scissors
 * Response Part 1 X = Rock, Y = Paper, Z = Scissors 
 * Response Part 2 X = loss, Y = tie, Z = win
 */
async function getDataAsArray () {
  try {
    const data = await readFile('strategy-guide.txt', 'utf-8')
    return data.split('\n').map(substring => substring.split(' '))
  } catch (err) {
    console.error(err)
  }
}

function getScorePart1 (gameArray) {
  // Set the base score for each play and the possible outcomes.
  const scoreKey = {
    'X': {
      score: 1,  // If I play X (Rock) it beats Scissors (C) and ties Rock (A)
      beats: 'C',
      ties: 'A',
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
  const baseScore = scoreKey[`${me}`].score
  // is win?
  if (scoreKey[`${me}`].beats === opponent) {
    return 6 + baseScore
  }
  // is tie?
  if (scoreKey[`${me}`].ties === opponent) {
    return 3 + baseScore
  }
  // isnt a win or a tie
  return 0 + baseScore
  
}

function getScorePart2 (gameArray) {
  // Key determines if we lose, tie or win.
  const scoreKey = {
    'X': {
      'A': 3,  // If X loses to A (Rock) play Scisors (3 points)
      'B': 1,  
      'C': 2
    },
    'Y': {
      'A': 1, // If Y ties A (Rock), play rock (1 point)
      'B': 2,
      'C': 3
    },
    'Z': {
      'A': 2, // If Z beats A (Rock), play paper (2 points)
      'B': 3,
      'C': 1
    }
  }

  const opponent = gameArray[0]
  const result = gameArray[1]
  const baseScore = scoreKey[result][`${opponent}`]
  // is win?
  if (result === 'Z') {
    return 6 + baseScore
  }
  // is tie?
  if (result === 'Y') {
    return 3 + baseScore
  }
  // isnt a win or a tie
  return 0 + baseScore  
}

const rpsGames = await getDataAsArray()
const finalScorePart1 = rpsGames.reduce((total, currentValue) => {
  return total + getScorePart1(currentValue)
}, 0)
const finalScorePart2 = rpsGames.reduce((total, currentValue) => {
  return total + getScorePart2(currentValue)
}, 0)
console.log('Part 1 final score:', finalScorePart1)
console.log('Part 2 final score:', finalScorePart2)
