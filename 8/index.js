import fs from 'fs'

const file = fs.readFileSync('./input.txt', 'utf-8')

const matrix = file.split(/\n/).map(line => line.split('').map(Number))
const rows_n = matrix.length
const cols_n = matrix[0].length

function part1() {
  let count = 0

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let visible = true

      for (let c = 0; c < j; c++) {
        if (matrix[i][c] >= matrix[i][j]) {
          visible = false
          break
        }
      }

      if (visible) {
        count++
        continue
      }

      visible = true
      for (let r = 0; r < i; r++) {
        if (matrix[r][j] >= matrix[i][j]) {
          visible = false
          break
        }
      }

      if (visible) {
        count++
        continue
      }

      visible = true

      for (let c = cols_n - 1; c > j; c--) {
        if (matrix[i][c] >= matrix[i][j]) {
          visible = false
          break
        }
      }

      if (visible) {
        count++
        continue
      }

      visible = true
      for (let r = rows_n - 1; r > i; r--) {
        if (matrix[r][j] >= matrix[i][j]) {
          visible = false
          break
        }
      }

      if (visible) {
        count++
        continue
      }
    }
  }

  return count 
}

function part2() {
  let max = 0

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      const x = matrix[i][j];
      
      let l, t, r, b;
      l = t = r = b = 0;

      for (let c = j - 1; c >= 0; c--) {
        l++
        if (x <= matrix[i][c]) break;
      }

      for (let r = i - 1; r >= 0; r--) {
        t++
        if (x <= matrix[r][j]) break;
      }

      for (let c = j + 1; c < cols_n; c++) {
        r++
        if (x <= matrix[i][c]) break;
      }

      for (let r = i + 1; r < rows_n; r++) {
        b++
        if (x <= matrix[r][j]) break;
      }

      max = Math.max(max, l * t * r * b)
    }
  }

  return max 
}

console.log(matrix)
console.log({ part1: part1(), part2: part2() })
