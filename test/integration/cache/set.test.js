const { get, set } = require('../../../app/cache')

const server = require('../../../app/server')

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
    expect(result).toBeUndefined()
  })

  test('GET /set route should not populate cache with false value', async () => {
    value = false

    await set(request, key, value)

    const result = await get(request, key)
    expect(result).toBeUndefined()
  })
})
