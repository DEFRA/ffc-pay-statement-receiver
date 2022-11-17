const { get } = require('../../../app/cache')

jest.mock('../../../app/cache/get-cache')
const getCache = require('../../../app/cache/get-cache')

jest.mock('../../../app/cache/get-cache-value')
const getCacheValue = require('../../../app/cache/get-cache-value')

const key = 'Key'
// const value = 'Value'

let request

beforeEach(async () => {
  // clear cache
  request = { server: { app: { cache: 1 } } }

  getCache.mockReturnValue(1)
  getCacheValue.mockResolvedValue(1)
})

afterEach(async () => {
  jest.resetAllMocks()
})

afterAll(async () => {
  // clear cache
})

describe('get cache', () => {
  test('should call getCache', async () => {
    await get(request, key)
    expect(getCache).toHaveBeenCalled()
  })

  test('should call getCache once', async () => {
    await get(request, key)
    expect(getCache).toHaveBeenCalledTimes(1)
  })

  test('should call getCache with request', async () => {
    await get(request, key)
    expect(getCache).toHaveBeenCalledWith(request)
  })

  test('should call getCacheValue', async () => {
    await get(request, key)
    expect(getCacheValue).toHaveBeenCalled()
  })

  test('should call getCacheValue once', async () => {
    await get(request, key)
    expect(getCacheValue).toHaveBeenCalledTimes(1)
  })

  test('should call getCacheValue with getCache and key', async () => {
    await get(request, key)
    expect(getCacheValue).toHaveBeenCalledWith(getCache(), key)
  })

  test('should return getCacheValue', async () => {
    const result = await get(request, key)
    expect(result).toStrictEqual((await getCacheValue()))
  })

  test('should return undefined when getCacheValue returns null', async () => {
    getCacheValue.mockResolvedValue(null)
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('should throw when getCache throws', async () => {
    getCache.mockImplementation(() => { throw new Error('Redis retreival error') })

    const wrapper = async () => {
      await get(request, key)
    }

    await expect(wrapper).rejects.toThrowError()
  })

  test('should throw Error when getCache throws Error', async () => {
    getCache.mockImplementation(() => { throw new Error('Redis retreival error') })

    const wrapper = async () => {
      await get(request, key)
    }

    await expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw "Redis retreival error" error when getCache throws "Redis retreival error" error', async () => {
    getCache.mockImplementation(() => { throw new Error('Redis retreival error') })

    const wrapper = async () => {
      await get(request, key)
    }

    expect(wrapper).rejects.toThrowError(/^Redis retreival error$/)
  })

  test('should throw when getCacheValue throws', async () => {
    getCacheValue.mockRejectedValue(new Error('Redis retreival error'))

    const wrapper = async () => {
      await get(request, key)
    }

    expect(wrapper).rejects.toThrowError()
  })

  test('should throw Error when getCacheValue throws Error', async () => {
    getCacheValue.mockRejectedValue(new Error('Redis retreival error'))

    const wrapper = async () => {
      await get(request, key)
    }

    expect(wrapper).rejects.toThrowError(Error)
  })

  test('should throw "Redis retreival error" error when getCacheValue throws "Redis retreival error" error', async () => {
    getCacheValue.mockRejectedValue(new Error('Redis retreival error'))

    const wrapper = async () => {
      await get(request, key)
    }

    expect(wrapper).rejects.toThrowError(/^Redis retreival error$/)
  })
})
