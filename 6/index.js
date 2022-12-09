import fs from 'fs'
import readline from 'readline';


function find_marker(datastream, size) {
  const map = new Map()
  let slow = 0
  let fast = 0

  for (const char of datastream) {
    if (map.has(char)) {
      const first_index = map.get(char)
      
      while (slow <= first_index) {
        map.delete(datastream[slow])
        slow++
      }
    }

    map.set(char, fast++)

    if (fast - slow === size) {
      break
    }
  }

  return fast;
}

const file = readline.createInterface({
  input: fs.createReadStream('./input.txt', 'utf-8')
});

for await (const datastream of file) {
  console.log(find_marker(datastream, 14));
}

