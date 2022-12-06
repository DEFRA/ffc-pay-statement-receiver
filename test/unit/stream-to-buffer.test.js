const { Readable } = require('stream')

const streamToBuffer = require('../../app/stream-to-buffer')

let readableStream

describe('readable stream contents is converted to an int Buffer', () => {
  beforeEach(async () => {
    readableStream = Readable.from(['pure', 'gubbins', 'to', 'be', 'refined'], { encoding: 'utf8' })
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('should return 1', async () => {
    const result = streamToBuffer(readableStream)
    expect(result).toBe(1)
  })
})
