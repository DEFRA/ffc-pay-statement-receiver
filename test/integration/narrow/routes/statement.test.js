const mockDownload = jest.fn(() => { return 1 })
jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(() => {
        return {
          getContainerClient: jest.fn().mockImplementation(() => {
            return {
              createIfNotExists: jest.fn(),
              getBlockBlobClient: jest.fn().mockImplementation(() => { // undefined
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

const { get, drop } = require('../../../../app/cache')

let server
let request

describe('Report test', () => {
  const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

  beforeEach(async () => {
    server = await createServer()
    // mockDownload.mockResolvedValue({
    //   readableStreamBody: Readable.from(['Statement', 'content'], { encoding: 'utf8' })
    // })
    await server.initialize()

    request = { server: { app: { cache: server.app.cache } } }
    await drop(request, FILENAME)
  })

  afterEach(async () => {
    await drop(request, FILENAME)
    await server.stop()
    jest.resetAllMocks()
  })

  test('should return response status code 200', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${FILENAME}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  // test that response has fileBuffer
  test('should return response.sommit to be some Buffer thing', async () => {
    const options = {
      method: 'GET',
      url: `/statement/v1/${FILENAME}`
    }

    const response = await server.inject(options)

    expect(response.statusCode).toBe(200)
  })

  // test('should set cache for FILENAME', async () => {
  //   const cacheForFilenameBefore = await get(request, FILENAME)
  //   const options = {
  //     method: 'GET',
  //     url: `/statement/v1/${FILENAME}`
  //   }

  //   await server.inject(options)

  //   const cacheForFilenameAfter = await get(request, FILENAME)
  //   expect(cacheForFilenameBefore).toBeNull()
  //   expect(cacheForFilenameAfter).toBeDefined()
  // })

  // test('GET /statement/{version}/{filename} route returns response status code 200 if statement not available', async () => {
  //   mockDownload = jest.fn().mockReturnValue(undefined)
  //   const options = {
  //     method: 'GET',
  //     url: `/statement/v1/${FILENAME}`
  //   }

  //   const response = await server.inject(options)
  //   expect(response.statusCode).toBe(200)
  // })

  // test('GET /statement/{version}/{filename} route returns file does not exist message stream if statement not available', async () => {
  //   mockDownload = jest.fn().mockReturnValue(undefined)
  //   await server.initialize()
  //   const options = {
  //     method: 'GET',
  //     url: `/statement/v1/${FILENAME}`
  //   }

  //   const response = await server.inject(options)
  //   expect(response.result.message).toBe(`${FILENAME} does not exist`)
  // })

  // test('GET /statement/{version}/{filename} route returns statusCode 404 if no filename provided', async () => {
  //   mockDownload = jest.fn().mockReturnValue(undefined)
  //   await server.initialize()
  //   const options = {
  //     method: 'GET',
  //     url: '/statement/v1/'
  //   }

  //   const response = await server.inject(options)
  //   expect(response.statusCode).toBe(404)
  // })
})
