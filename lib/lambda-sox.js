'use strict'

const spawn = require('./spawn')
const fs = require('fs')

function invokeCommand(command, args) {
  if (typeof args === 'string')
    return spawn(`${command} ${args}`)

  if (Array.isArray(args))
    return spawn(command, args)

  throw new Error('Arguments need to be passed as a string or an array')
}

function sox(options) {
  const command = process.env.NODE_ENV === 'test' ? (process.env.SOX_PATH || 'sox') : `${__dirname}/bin/sox`
  return invokeCommand(command, options)
}

function soxi(options) {
  // If soxi symlink is uploaded us it
  const lambdaSoxiPath = fs.existsSync(`${__dirname}/bin/soxi`) ? `${__dirname}/bin/soxi` : '/tmp/soxi'

  if (process.env.NODE_ENV !== 'test' && lambdaSoxiPath === '/tmp/soxi' && !fs.existsSync(lambdaSoxiPath))
    // Current version of Claudia.js is not uploading symlinks, and soxi is simply a symlink to sox,
    // so we need to check if soxi is already present in /tmp and create symlink if it's not
    fs.symlinkSync('./bin/sox', '/tmp/soxi')

  const command = process.env.NODE_ENV === 'test' ? (process.env.SOXI_PATH || 'soxi') : lambdaSoxiPath
  return invokeCommand(command, options)
}

function lame(options) {
  const command = process.env.NODE_ENV === 'test' ? (process.env.LAME_PATH || 'lame') : `${__dirname}/bin/lame`
  return invokeCommand(command, options)
}

module.exports = {
  sox: sox,
  soxi: soxi,
  lame: lame
}
