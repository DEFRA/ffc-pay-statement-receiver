const mockFn = jest.fn(() => { return 1 })
jest.mock('@azure/storage-blob', () => {
  return {
    BlobServiceClient: {
      fromConnectionString: jest.fn().mockImplementation(() => {
        return {
          getContainerClient: jest.fn().mockImplementation(() => {
            return {
              getBlockBlobClient: jest.fn().mockImplementation(() => { // undefined
                return {
                  download: mockFn
                }
              })
            }
          })
        }
      })
    }
  }
})

const testFn = require('../../../../app/test')

describe('test', () => {
  test('works', async () => {
    const result = await testFn()
    expect(result).toBe(1)
  })

  test('works but doesn\'t seem to in statements', async () => {
    const result = await testFn()
    expect(result).toBe(1)
  })
})
