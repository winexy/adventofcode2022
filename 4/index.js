import fs from 'fs';
import readline from 'readline';

async function part1() {
  const lines = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
  });

  let count = 0;

  function has_overlap(p1, p2) {
    return p1[0] <= p2[0] && p1[1] >= p2[1];
  }

  for await (const line of lines) {
    const [pair1, pair2] = line.split(',').map((s) => s.split('-').map(Number));

    if (has_overlap(pair1, pair2) || has_overlap(pair2, pair1)) {
      count++;
    }
  }

  console.log({ count });
}

async function part2() {
  const lines = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
  });

  let count = 0;

  function has_overlap(p1, p2) {
    return (p1[0] <= p2[0] && p2[0] <= p1[1]) || (p1[0] <= p2[1] && p2[1] <= p1[1]);
  }

  for await (const line of lines) {
    const [pair1, pair2] = line.split(',').map((s) => s.split('-').map(Number));

    if (has_overlap(pair1, pair2) || has_overlap(pair2, pair1)) {
      count++;
    }
  }

  console.log({ count });
}

part1();
part2();
