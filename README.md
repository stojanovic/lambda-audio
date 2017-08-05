# SoX for AWS Lambda

Run Sound eXchange (SoX), the Swiss Army knife of audio manipulation, with Lame on AWS Lambda.

## What

`lambda-audio` is static binary of [sox](http://sox.sourceforge.net) utility, built for AWS Lambda. It supports `sox`, `soxi` and `lame` commands.

## Why

`lambda-audio` allows you to covert and merge multiple audio files using AWS Lambda.

You can use it as a replacement/cheaper version of [Amazon Elastic Transcoder](https://aws.amazon.com/elastictranscoder/). Or you can use it for the workflows that are not currently possible on Elastic Transcoder.

Motivation behind this library was a use case where we had up to five audio file that needs to be merged with specific rules — we need to put music in the background and different pauses between voice files. Service is used only from time to time, but we had instance for node.js app running all the time. This library is trying to solve that problem and allow us to do merging and conversion in AWS Lambda.

## How

### Installation

You can install this package from NPM by running following command:

```shell
npm install lambda-audio --save
```

### Usage

After you require node module in your code by adding:

```javascript
const lambdaAudio = require('lambda-audio')
```

`lambdaAudio` will contain three functions:

- sox
- soxi
- lame

Each of the functions receives 1 argument that can be the string that contains the command or an array of attributes that needs to be passed to the command.

Each function is returning promise that will resolve when the command is successfully executed or has an error. Success answers will go to `.then` statement, errors will go to `.catch` statement. Response for both success and error will be passed as a string argument.

See below for the examples.

#### sox command

Let's say that you want to convert input.mp3 file to mono, and output it as output.wav file, in command line you would do that like this:

```shell
sox input.mp3 -c 1 output.wav
```

With `lambda-audio` you can do that by passing the command as a string, just without `sox`	part, like this:

```javascript
lambdaAudio.sox('./input.mp3 -c 1 /tmp/output.wav')
  .then(response => {
    // Do something when the file was converted
  })
  .catch(errorResponse => {
    console.log('Error from the sox command:', errorResponse)
  })
```

Or by passing the arguments as an array:

```javascript
lambdaAudio.sox(['./input.mp3', '-c', '1', '/tmp/output.wav'])
  .then(response => {
    // Do something when the file was converted
  })
  .catch(errorResponse => {
    console.log('Error from the sox command:', errorResponse)
  })
```

Keep in mind that AWS Lambda is read only and that the output path needs to be in /tmp folder.

For the full list of options, visit [sox documentation](http://sox.sourceforge.net/soxformat.html).

#### soxi command

Let's say that you want to see the info about input.mp3 file, in command line you would do that like this:

```shell
soxi input.mp3
```

With `lambda-audio` you can do that by passing the command as a string:

```javascript
lambdaAudio.soxi('./input.mp3')
  .then(response => {
    // Do something with the info
  })
  .catch(errorResponse => {
    console.log('Error from the soxi command:', errorResponse)
  })
```

Or by passing the arguments as an array:

```javascript
lambdaAudio.soxi(['./input.mp3'])
  .then(response => {
    // Do something with the info
  })
  .catch(errorResponse => {
    console.log('Error from the soxi command:', errorResponse)
  })
```

For the full list of options, visit [soxi documentation](http://sox.sourceforge.net/soxi.html).

#### lame command

Let's say you want to re-encode existing MP3 to 64 kbps MP3, in command line you would do it like this:

```shell
lame -b 64 input.mp3 output.mp3
```

With `lambda-audio` you can do that by passing the command as a string:

```javascript
lambdaAudio.lame('-b 64 ./input.mp3 /tmp/output.mp3')
  .then(response => {
    // Do something with the new mp3 file
  })
  .catch(errorResponse => {
    console.log('Error from the lame command:', errorResponse)
  })
```

Or by passing the arguments as an array:

```javascript
lambdaAudio.lame(['-b', '64', './input.mp3', '/tmp/output.mp3'])
  .then(response => {
    // Do something with the new mp3 file
  })
  .catch(errorResponse => {
    console.log('Error from the lame command:', errorResponse)
  })
```

For the full list of options, visit [lame documentation](http://lame.cvs.sourceforge.net/viewvc/lame/lame/USAGE).

### Deployment

`lambda-audio` is working perfectly with [Claudia.js](https://claudiajs.com) library, but you can use it with other AWS Libraries and frameworks too.

With Claudia.js, simply save `lambda-audio` as a dependency and then you can deploy your AWS Lambda function using standard `claudia create` command.

### Testing

We use [Jasmine](https://jasmine.github.io/) for unit and integration tests. Unless there is a very compelling reason to use something different, please continue using Jasmine for tests. The existing tests are in the [spec](spec) folder. Here are some useful command shortcuts:

Run all the tests:

```bash
npm test
```

Run only some tests:

```bash
npm test -- filter=prefix
```

Get detailed hierarchical test name reporting:

```bash
npm test -- full
```

## License

GNU GENERAL PUBLIC LICENSE, Version 2 -- see [LICENSE](LICENSE)
