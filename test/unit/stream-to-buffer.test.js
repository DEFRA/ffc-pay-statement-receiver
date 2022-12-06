const { Readable } = require('stream')

const streamToBuffer = require('../../app/stream-to-buffer')

let streamData
let readableStream

// getFileStream prob doesn't need a unit test file becuase it's very Azure heavy
// testing it in integration tests (i.e. statements) is good enough

describe('readable stream contents is converted to an int Buffer', () => {
  beforeEach(async () => {
    streamData = ['pure', 'gubbins', 'to', 'be', 'refined']
    readableStream = Readable.from(streamData, { encoding: 'utf8' })
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('should return 1', async () => {
    const result = streamToBuffer(readableStream)
    expect(result).toBe(1) // what should this actually return, probs a Buffer of everything in streamData
  })

  // what forms can readableStream take? (check the docs)
  // based off this, what happens if readableStream is in each of these states?
  // i.e. what if readableStream is empty? what if we add to readableStream partway through?
  // what if this function gets a wrong input type, i.e. [], {}, 'stream', etc
})
