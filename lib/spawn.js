'use strict'

const childProcess = require('child_process')

function spawnPromise(command, commandArgs, options) {
  return new Promise((resolve, reject) => {
    const process = childProcess.spawn(command, commandArgs, options)
    const log = []

    process.stdout.on('data', buffer => log.push(buffer.toString()))

    process.stderr.on('data', buffer => log.push(buffer.toString()))

    process.on('close', code => {
      if (code !== 0) {
        if (log.length) {
          return reject(log.join('\n'))
        }

        return reject(code)
      }

      if (log.length)
        return resolve(log.join('\n'))

      resolve()
    })
  })
}

module.exports = spawnPromise
