const { drop } = require('../../app/cache')

jest.mock('../../app/cache')
const { get } = require('../../app/cache')

const getSommit = require('../../app/get-sommit')

const key = 'Key'

let request

beforeEach(async () => {
  request = { server: { app: { cache: { key: 1 } } } }

  get.mockResolvedValue(request.server.app.cache.key)
})

afterEach(async () => {
  await drop(request, key)
  jest.resetAllMocks()
})

describe('get sommit', () => {
  test('should call get', async () => {
    await getSommit(request, key)
    expect(get).toHaveBeenCalled()
  })

  test('should call get once', async () => {
    await getSommit(request, key)
    expect(get).toHaveBeenCalledTimes(1)
  })

  test('should call get with request and key', async () => {
    await getSommit(request, key)
    expect(get).toHaveBeenCalledWith(request, key)
  })

  test('should return get', async () => {
    const result = await getSommit(request, key)
    expect(result).toStrictEqual((await get()))
  })

  test('should return "mock read through cache method to be created and called" when get returns undefined', async () => {
    get.mockResolvedValue(undefined)
    const result = await getSommit(request, key)
    expect(result).toBe('mock read through cache method to be created and called')
  })

  test('should return undefined when get throws', async () => {
    get.mockRejectedValue(new Error('Redis retreival error'))
    const result = await getSommit(request, key)
    await expect(result).toBeUndefined()
  })
})
