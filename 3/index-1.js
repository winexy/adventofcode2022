import fs from 'fs';
import readline from 'readline';

const lines = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
});

let totalPriority = 0

const z = 'z'.charCodeAt(0)
const Z = 'Z'.charCodeAt(0)

for await (const line of lines) {
  const N = line.length;
  const first = new Set(line.slice(0, N / 2));
  const second = new Set(line.slice(N / 2));

  for (const ch of first) {
    if (first.has(ch) && second.has(ch)) {
      const code = ch.charCodeAt(0)
      const isLower = code >= 'a'.charCodeAt(0)
      const priority = isLower ? 26 - (z - code) : 26 - (Z - code) + 26;
      
      totalPriority += priority;
    }
  }
}

console.log(totalPriority)