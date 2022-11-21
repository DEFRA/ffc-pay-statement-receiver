const { get, set } = require('../../../app/cache')

const server = require('../../../app/server')

const value = 'Value'

let key
let request

beforeEach(async () => {
  await server.initialize()

  const options = {
    method: 'GET',
    url: '/get'
  }

  key = 'Key'
  request = (await server.inject(options)).request

  await set(request, key, value)
})

afterEach(async () => {
  jest.resetAllMocks()
})

describe('get cache', () => {
  test('GET /get route should return defined', async () => {
    const result = await get(request, key)
    expect(result).toBeDefined()
  })

  test('GET /get route should return value', async () => {
    const result = await get(request, key)
    expect(result).toBe(value)
  })

  test('GET /get route should return undefined when non-matching cache key is given', async () => {
    key = 'Key name not in cache'
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when null cache key is given', async () => {
    key = null
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when undefined cache key is given', async () => {
    key = undefined
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when empty array cache key is given', async () => {
    key = []
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when empty object cache key is given', async () => {
    key = {}
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when false cache key is given', async () => {
    key = false
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when true cache key is given', async () => {
    key = true
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })

  test('GET /get route should return undefined when incorrect request is given', async () => {
    request = {}
    const result = await get(request, key)
    expect(result).toBeUndefined()
  })
})
