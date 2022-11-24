jest.mock('../../../app/cache/get-cache')
const getCache = require('../../../app/cache/get-cache')

jest.mock('../../../app/cache/get-cache-value')
const getCacheValue = require('../../../app/cache/get-cache-value')

const { get } = require('../../../app/cache')

const key = 'Key'

let request

beforeEach(async () => {
  request = { server: { app: { cache: 1 } } }

  getCache.mockReturnValue(1)
  getCacheValue.mockResolvedValue(1)
})

afterEach(async () => {
  jest.resetAllMocks()
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

  test('should return "mock read through cache method to be created and called" when getCacheValue returns null', async () => {
    getCacheValue.mockResolvedValue(null)
    const result = await get(request, key)
    expect(result).toBe('mock read through cache method to be created and called')
  })

  test('should return undefined when getCache throws', async () => {
    getCache.mockImplementation(() => { throw new Error('Redis retreival error') })
    const result = await get(request, key)
    await expect(result).toBeUndefined()
  })

  test('should return undefined when getCacheValue throws', async () => {
    getCacheValue.mockRejectedValue(new Error('Redis retreival error'))
    const result = await get(request, key)
    await expect(result).toBeUndefined()
  })
})
