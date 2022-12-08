import { inspect } from 'util'
import fs from 'fs'
import readline from 'readline'

const lines = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
})

const root = {}
root['..'] = root

let cursor = root

function cd(dir) {
  if (dir === '/') {
    cursor = root
    return
  }

  const has_dir = dir in cursor

  if (!has_dir) {
    cursor[dir] = {
      '..': cursor,
    }
  }

  cursor = cursor[dir]
}

for await (const line of lines) {
  const tokens = line.split(' ')

  switch (tokens[0]) {
    case '$': {
      const cmd = tokens[1]

      switch (cmd) {
        case 'cd': {
          const dir_name = tokens[2]
          cd(dir_name)
          break
        }
      }
      break
    }
    case 'dir': {
      const dir_name = tokens[1]

      cursor[dir_name] = {
        '..': cursor,
      }
      break
    }
    default: {
      const file_size = Number(tokens[0])
      const file_name = tokens[1]

      cursor[file_name] = file_size
      break
    }
  }
}

const __size__ = Symbol('__size__')

function mark_directory_sizes(node) {
  if (typeof node === 'number') {
    return node
  }

  node[__size__] = 0

  for (const name in node) {
    const resource = node[name]

    if (name !== '..' && name !== __size__) {
      node[__size__] += mark_directory_sizes(resource)
    }
  }

  return node[__size__]
}

function get_dir_sizes(root) {
  let dirs = []
  let queue = [['/', root]]

  while (queue.length) {
    const [name, ref] = queue.pop()

    dirs.push({ name, size: ref[__size__] })

    for (const name in ref) {
      const resource = ref[name]
      const is_file = typeof resource === 'number'

      if (!is_file && name !== '..' && name !== __size__) {
        queue.push([name, resource])
      }
    }
  }

  return dirs
}

mark_directory_sizes(root)

const dir_sizes = get_dir_sizes(root)
  .filter(dir => dir.size <= 100_000)
  .reduce((a, b) => a + b.size, 0)

console.log(dir_sizes)
