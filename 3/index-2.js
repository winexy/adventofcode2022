import fs from 'fs';

const lines = fs.readFileSync('./input.txt', 'utf-8').split(/\n/);

let totalPriority = 0;

const z = 'z'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);

for (let i = 0; i < lines.length / 3; i++) {
  const offset = i * 3;
  const first = lines[offset].split('');
  const second = new Set(lines[offset + 1]);
  const third = new Set(lines[offset + 2]);

  const set = new Set(first.filter((ch) => second.has(ch) && third.has(ch)));

  const [ch] = Array.from(set);

  const code = ch.charCodeAt(0);
  const isLower = code >= 'a'.charCodeAt(0);
  const priority = isLower ? 26 - (z - code) : 26 - (Z - code) + 26;

  totalPriority += priority;
}

console.log(totalPriority)
