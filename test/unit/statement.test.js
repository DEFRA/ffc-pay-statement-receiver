const createServer = require('../../app/server')

jest.mock('../../app/storage')
const { getFileStream } = require('../../app/storage')

jest.mock('../../app/cache')
const { get, set } = require('../../app/cache')

jest.mock('../../app/stream-to-buffer')
const streamToBuffer = require('../../app/stream-to-buffer')

let filename
let fileContent
let server

describe('Statement route', () => {
  beforeEach(async () => {
    filename = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
    fileContent = 'Statement content'
    server = await createServer()

    getFileStream.mockResolvedValue({
      readableStreamBody: fileContent
    })
    streamToBuffer.mockResolvedValue(Buffer.from(fileContent))

    get.mockResolvedValue(Buffer.from(fileContent))
    set.mockResolvedValue(undefined)

    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
    jest.resetAllMocks()
  })

  test('should call get', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(get).toBeCalled()
  })

  test('should call get once', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(get).toBeCalledTimes(1)
  })

  test('should call get with request and filename', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(get).toBeCalledWith(response.request, filename)
  })

  test('should not call getFileStream', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(getFileStream).not.toBeCalled()
  })

  test('should not call streamToBuffer', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(streamToBuffer).not.toBeCalled()
  })

  test('should not call set', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(set).not.toBeCalled()
  })

  test('should return response status code 200', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  test('should return response payload with fileContent', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.payload).toBe(fileContent)
  })

  test('should call get when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(get).toBeCalled()
  })

  test('should call get once when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(get).toBeCalledTimes(1)
  })

  test('should call get with request and filename when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(get).toBeCalledWith(response.request, filename)
  })

  test('should call getFileStream when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(getFileStream).toBeCalled()
  })

  test('should call getFileStream once when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(getFileStream).toBeCalledTimes(1)
  })

  test('should call getFileStream with filename when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(getFileStream).toBeCalledWith(filename)
  })

  test('should call streamToBuffer when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(streamToBuffer).toBeCalled()
  })

  test('should call streamToBuffer once when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(streamToBuffer).toBeCalledTimes(1)
  })

  test('should call streamToBuffer with getFileStream().readableStreamBody when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(streamToBuffer).toBeCalledWith((await getFileStream()).readableStreamBody)
  })

  test('should call set when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(set).toBeCalled()
  })

  test('should call set once when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    expect(set).toBeCalledTimes(1)
  })

  test('should call set with request, filename and streamToBuffer when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(set).toBeCalledWith(response.request, filename, await streamToBuffer())
  })

  test('should return response status code 200 when filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  test('should return payload with fileContent if filename not in cache', async () => {
    get.mockResolvedValue(undefined)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.payload).toBe(fileContent)
  })

  test('should return statusCode 404 if no filename provided', async () => {
    filename = ''
    await server.initialize()
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(404)
  })
})
