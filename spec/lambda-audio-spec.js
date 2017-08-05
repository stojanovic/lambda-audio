/* global describe, it, expect */
'use strict'

const path = require('path')
const underTest = require('../lib/lambda-audio')

const rainMp3Info = `
                     Input File     : '/Users/slobodan/Github/lambda-sox/spec/files/rain.mp3'
                     Channels       : 2
                     Sample Rate    : 44100
                     Precision      : 16-bit
                     Duration       : 00:00:07.89 = 347861 samples = 591.6 CDDA sectors
                     File Size      : 126k
                     Bit Rate       : 128k
                     Sample Encoding: MPEG audio (layer I, II or III)

                     `.replace(/ {21}/g, '')

describe('Lambda Audio', () => {
  it('should export an object with three functions - sox, soxi and lame', () => {
    ['sox', 'soxi', 'lame'].forEach(item => expect(typeof underTest[item]).toBe('function'))
    expect(typeof underTest).toBe('object')
  })

  it('should return a promise for each of the functions', () => {
    ['sox', 'soxi', 'lame'].forEach(item => {
      const func = underTest[item](['-help'])
        .catch(() => {})
      expect(typeof func.then).toBe('function')
    })
  })

  it('should show an info about the song if soxi is invoked with a file path as a string', done => {
    underTest.soxi(path.join(__dirname, './files/rain.mp3'))
      .then(info => {
        expect(info).toBe(rainMp3Info)
        return info
      })
      .then(done)
      .catch(done.fail)
  })

  it('should show an info about the song if soxi is invoked with a file path as an array', done => {
    underTest.soxi([path.join(__dirname, './files/rain.mp3')])
      .then(info => {
        expect(info).toBe(rainMp3Info)
        return info
      })
      .then(done)
      .catch(done.fail)
  })
})
