import fs from 'fs'
import readline from 'readline'

const lines = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
})

const root = {}
root['..'] = root

let cursor = root

for await (const line of lines) {
  const tokens = line.split(' ')

  switch (tokens[0]) {
    case '$': {
      const cmd = tokens[1]

      switch (cmd) {
        case 'cd': {
          const dir_name = tokens[2]

          if (dir_name === '/') {
            cursor = root
            break
          }

          cursor = cursor[dir_name]
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

/**
 * @description
 * Traverse FS tree and add __size__ property for directories
 */
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

/**
 * @description
 * Traverse FS tree and extract each directory name and size
 */
function get_dir_sizes(node, name = '/', dirs = []) {
  dirs.push({ name, size: node[__size__] })

  for (const name in node) {
    const resource = node[name]
    const is_file = typeof resource === 'number'
    const is_parent_ref = name === '..'
    const is_size_prop = name === __size__

    if (!is_file && !is_parent_ref && !is_size_prop) {
      get_dir_sizes(resource, name, dirs)
    }
  }

  return dirs
}

mark_directory_sizes(root)

const dir_sizes = get_dir_sizes(root).sort((a, z) => a.size - z.size)

const part1 = dir_sizes
  .filter(dir => dir.size <= 100_000)
  .reduce((a, b) => a + b.size, 0)

const total_space = 70_000_000
const required_for_update = 30_000_000

const { size: total_used_space } = dir_sizes.find(dir => dir.name === '/')

const unused_space = total_space - total_used_space
const needed_space = required_for_update - unused_space

const { size: part2 } = dir_sizes.find(dir => dir.size >= needed_space)

console.log({ part1, part2 })
