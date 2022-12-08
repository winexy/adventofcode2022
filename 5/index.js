import fs from 'fs';

function main(perform_operation) {
  const file = fs.readFileSync('./input.txt', 'utf-8');
  const [raw_scheme, raw_operations] = file.split(/\n\n/);

  const operations = raw_operations.split(/\n/).map((line) => {
    const regex = /move (\d*) from (\d*) to (\d*)/;
    const [move, from, to] = line.match(regex).slice(1).map(Number);
    return { move, from, to };
  });

  const scheme = raw_scheme
    .split(/\n/)
    .slice(0, -1)
    .map((line) => {
      const regex = /(.{3})(?: )?/g;
      return line.match(regex).map((s) => s.replace(/\W/g, ''));
    });

  const stacks = Array.from(scheme[0], () => []);

  for (let i = 0; i < scheme.length; i++) {
    for (let j = 0; j < scheme[i].length; j++) {
      if (scheme[i][j] !== '') {
        stacks[j].unshift(scheme[i][j]);
      }
    }
  }

  for (const op of operations) {
    perform_operation(op.move, stacks[op.from - 1], stacks[op.to - 1]);
  }

  return stacks.map((stack) => stack[stack.length - 1]).join('');
}

const part1 = main((move, stack_from, stack_to) => {
  for (let i = 0; i < move; i++) {
    stack_to.push(stack_from.pop());
  }
});

const part2 = main((move, stack_from, stack_to) => {
  const cranes = [];
  for (let i = 0; i < move; i++) {
    cranes.unshift(stack_from.pop());
  }
  stack_to.push(...cranes);
});

console.log({ part1, part2 });
