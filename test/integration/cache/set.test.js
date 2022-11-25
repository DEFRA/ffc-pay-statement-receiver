const config = require('../../../app/config')
const server = require('../../../app/server')

const { get, set } = require('../../../app/cache')

let key
let value
let request

beforeEach(async () => {
  await server.initialize()

  const options = {
    method: 'GET',
    url: '/set'
  }

  key = 'Key'
  value = 'Value'
  request = (await server.inject(options)).request
})

afterEach(async () => {
  jest.resetAllMocks()
})

describe('set cache', () => {
  test('GET /set route should return undefined', async () => {
    const result = await set(request, key, value)
    expect(result).toBeUndefined()
  })

  test('GET /set route should populate cache with key', async () => {
    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBeDefined()
  })

  test('GET /set route should populate cache with value', async () => {
    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBe(value)
  })

  test('GET /set route should populate cache with empty array value', async () => {
    value = []

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toStrictEqual(value)
  })

  test('GET /set route should populate cache with empty object value', async () => {
    value = {}

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toStrictEqual(value)
  })

  test('GET /set route should populate cache with true value', async () => {
    value = true

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toStrictEqual(value)
  })

  test('GET /set route should not populate cache with undefined value', async () => {
    value = undefined

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /set route should not populate cache with null value', async () => {
    value = null

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBe('mock read through cache method to be created and called')
  })

  test('GET /set route should not populate cache with false value', async () => {
    value = false

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBe('mock read through cache method to be created and called')
  })

  test('GET /set route should have cache value expire after config.cache.ttl has passed', async () => {
    await set(request, key, value)

    const beforeTtlTimeout = await get(request, key)

    jest.useFakeTimers()
    jest.setSystemTime(new Date(new Date().getTime() + config.cache.ttl + 999))
    const afterTtlTimeout = await get(request, key)

    expect(beforeTtlTimeout).toBe(value)
    expect(afterTtlTimeout).toBe('mock read through cache method to be created and called')
  })
})
