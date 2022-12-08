import fs from 'fs'

const file = fs.readFileSync('./input.txt', 'utf-8')
const elves = file.split(/\n\n/)
const caloriesPerElf = elves.map(elf => elf.split(/\n/).map(Number))
const totalCaloriesPerElf = caloriesPerElf.map(calories => calories.reduce((a, b) => a + b, 0));
const sortedCaloriesPerElf = totalCaloriesPerElf.sort((a, z) => z - a);
const top3 = sortedCaloriesPerElf.slice(0, 3);
const top3_sum = top3.reduce((a, b) => a + b, 0);

console.log(top3_sum)
