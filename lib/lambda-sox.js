'use strict'

const spawn = require('./spawn')

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
  const command = process.env.NODE_ENV === 'test' ? (process.env.SOXI_PATH || 'soxi') : `${__dirname}/bin/soxi`
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
