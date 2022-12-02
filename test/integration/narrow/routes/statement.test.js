const createServer = require('../../../../app/server')

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
                  upload: mockUpload
                }
              })
            }
          })
        }
      })
    }
  }
})

let mockDownload
let mockUpload
let server

const startServer = async () => {
  server = await createServer()
  await server.initialize()
}

describe('Report test', () => {
  const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

  beforeEach(async () => {
    mockDownload = jest.fn().mockReturnValue({
      readableStreamBody: 'Statement content'
    })
    mockUpload = jest.fn().mockReturnValue(undefined)
  })

  afterEach(async () => {
    await server.stop()
    jest.resetAllMocks()
  })

  test('GET /statement/{version}/{filename}  route returns response status code 200 if statement available', async () => {
    await startServer()
    const options = {
      method: 'GET',
      url: `/statement/v1/${FILENAME}`
    }

    const response = await server.inject(options)
    expect(response.payload).toBe('Statement content')
    expect(response.statusCode).toBe(200)
  })

  test('GET /statement/{version}/{filename} route returns file does not exist message stream if statement not available', async () => {
    await startServer()
    mockDownload = jest.fn().mockReturnValue(undefined)
    await server.initialize()
    const options = {
      method: 'GET',
      url: `/statement/v1/${FILENAME}`
    }

    const response = await server.inject(options)
    expect(response.result.message).toBe(`${FILENAME} does not exist`)
  })

  test('GET /statement/{version}/{filename} route returns statusCode 404 if no filename provided', async () => {
    await startServer()
    mockDownload = jest.fn().mockReturnValue(undefined)
    await server.initialize()
    const options = {
      method: 'GET',
      url: '/statement/v1/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(404)
  })
})
