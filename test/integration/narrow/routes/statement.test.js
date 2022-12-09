const mockDownload = jest.fn()
jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(() => {
        return {
          getContainerClient: jest.fn().mockImplementation(() => {
            return {
              createIfNotExists: jest.fn(),
              getBlockBlobClient: jest.fn().mockImplementation(() => {
                return {
                  download: mockDownload,
                  upload: jest.fn()
                }
              })
            }
          })
        }
      })
    }
  }
})

const { Readable } = require('stream')

const createServer = require('../../../../app/server')

const { get, drop, set } = require('../../../../app/cache')

let server
let request

let filename
let streamContent

describe('Statement route', () => {
  beforeEach(async () => {
    server = await createServer()
    request = { server: { app: { cache: server.app.cache } } }

    filename = 'FFC_PaymentStatement_SFI_2022_1234567890_1.pdf'
    streamContent = 'Statement content'

    mockDownload.mockResolvedValue({
      readableStreamBody: Readable.from(streamContent, { encoding: 'utf8' })
    })

    await server.initialize()
    await drop(request, filename)
  })

  afterEach(async () => {
    await drop(request, filename)
    await server.stop()
  })

  test('should set cache for filename', async () => {
    const cacheForFilenameBefore = await get(request, filename)
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    await server.inject(options)

    const cacheForFilenameAfter = await get(request, filename)
    expect(cacheForFilenameBefore).toBeNull()
    expect(cacheForFilenameAfter).toBeDefined()
  })

  test('should return response status code 200', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  test('should return content type as pdf', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers['content-type']).toBe('application/pdf')
  })

  test('should return content disposition header as attachment of the filename', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers['content-disposition']).toBe(`attachment;filename=${filename}`)
  })

  test('should return connection header as keep-alive', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers.connection).toBe('keep-alive')
  })

  test('should return cache control header as no', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers['cache-control']).toBe('no-cache')
  })

  test('should return result as streamContent', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.result).toBe(streamContent)
  })

  test('should return response status code 400 when storage cannot retreive file', async () => {
    mockDownload.mockRejectedValue(new Error('Blob storage retreival issue'))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(400)
  })

  test('should return response result message "filename does not exist" when storage cannot retreive file', async () => {
    mockDownload.mockRejectedValue(new Error('Blob storage retreival issue'))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.result.message).toBe(`${filename} does not exist`)
  })

  test('should return response status code 200 when filename exists in cache', async () => {
    set(request, filename, Buffer.from(streamContent))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  test('should return content type as pdf when filename exists in cache', async () => {
    set(request, filename, Buffer.from(streamContent))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers['content-type']).toBe('application/pdf')
  })

  test('should return content disposition header as attachment of the filename when filename exists in cache', async () => {
    set(request, filename, Buffer.from(streamContent))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.headers['content-disposition']).toBe(`attachment;filename=${filename}`)
  })

  test('should return result as streamContent when filename exists in cache', async () => {
    set(request, filename, Buffer.from(streamContent))
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.result).toBe(streamContent)
  })

  test('should return status code 400 if filename does not end in .pdf', async () => {
    filename = 'notValidFilename'
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(400)
  })

  test('should return result message "Filename must end in .pdf." if filename does not end in .pdf', async () => {
    filename = 'notValidFilename'
    const options = {
      method: 'GET',
      url: `/statement/v1/${filename}`
    }

    const response = await server.inject(options)

    expect(response.result.message).toBe('Filename must end in .pdf.')
  })
})
