import fs from 'fs'
import readline from 'readline'

const Rock = 1
const Paper = 2
const Scissors = 3

const Win = 6
const Draw = 3
const Lose = 0

const FinishHim = shape => ({ 
  [Scissors]: Rock, 
  [Paper]: Scissors, 
  [Rock]: Paper 
}[shape])

const Defeat = shape => ({ 
  [Scissors]: Paper, 
  [Paper]: Rock, 
  [Rock]: Scissors 
}[shape])


const DecodeRivalMove = symbol => ({ 
  A: Rock, 
  B: Paper, 
  C: Scissors
}[symbol])

const DecodeOutcome = symbol => ({
  X: Lose,
  Y: Draw,
  Z: Win
}[symbol])

const input = fs.createReadStream('./input.txt', 'utf-8')
const lines = readline.createInterface({ input })

let total = 0

for await (const line of lines) {
  const rivalMove = DecodeRivalMove(line.charAt(0))
  const outcome = DecodeOutcome(line.charAt(2))

  total += outcome + {
    [Lose]: Defeat(rivalMove),
    [Win]: FinishHim(rivalMove),
    [Draw]: rivalMove
  }[outcome]
}

console.log(total)
