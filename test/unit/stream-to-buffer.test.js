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

  test('should return an instance of a Buffer when valid StreamData provided', async () => {
    const result = await streamToBuffer(readableStream)
    expect(result).toBeInstanceOf(Buffer) // what should this actually return, probs a Buffer of everything in streamData
  })

  // test('should return a Buffer of streamData', async () => {
  //   const result = await streamToBuffer(readableStream)
  //   expect(result).toBe(Buffer.from(readableStream))
  //   // How can I check this returns a Buffer of streamData without repeating the functionality of the stream-to-buffer function
  // })

  test('should return an instance of a Buffer when readableFlowing is set to null', async () => {
    readableStream.readableFlowing = null
    const result = await streamToBuffer(readableStream)
    expect(result).toBeInstanceOf(Buffer)
  })

  // test('should return an instance of a Buffer when readableFlowing is set to true', async () => {
  //   readableStream.readableFlowing = true
  //   const result = await streamToBuffer(readableStream)
  //   expect(result).toBeInstanceOf(Buffer)
  // })

  test('should reject to a TypeError when streamToBuffer is called with an array', async () => {
    readableStream = []
    try {
      await streamToBuffer(readableStream)
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError)
    }
  })

  test('should reject to a TypeError when streamToBuffer is called with a string', async () => {
    readableStream = 'string'
    try {
      await streamToBuffer(readableStream)
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError)
    }
  })

  test('should reject to a TypeError when streamToBuffer is called with a object', async () => {
    readableStream = { key: 'value' }
    try {
      await streamToBuffer(readableStream)
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError)
    }
  })

  // what forms can readableStream take? (check the docs) 'flowing' and 'paused'? or readableFlowing true, false, null
  // based off this, what happens if readableStream is in each of these states?
  // i.e. what if readableStream is empty? what if we add to readableStream partway through?
  // what if this function gets a wrong input type, i.e. [], {}, 'stream', etc
})
