import { inspect } from 'util'
import fs from 'fs'
import readline from 'readline';

const lines = readline.createInterface({
  input: fs.createReadStream('./input.txt')
})

const root = {};
root['..'] = root

let cursor = root;

function cd(dir) {
  if (dir === '/') {
    cursor = root;
    return;
  }

  const has_dir = dir in cursor;

  if (!has_dir) {
    cursor[dir] = {
      '..': cursor
    }
  }

  cursor = cursor[dir]
}

for await (const line of lines) {
  const tokens = line.split(' ');

  switch (tokens[0]) {
    case '$': {
      const cmd = tokens[1];

      switch (cmd) {
        case 'cd': {
          const dir_name = tokens[2];
          cd(dir_name)
          break;
        }
      }
      break
    }
    case 'dir': {
      const dir_name = tokens[1];

      cursor[dir_name] = {
        '..': cursor
      };
      break
    }
    default: {
      const file_size = Number(tokens[0]);
      const file_name = tokens[1];

      cursor[file_name] = file_size
      break
    }
  }
}


console.log(inspect(root));