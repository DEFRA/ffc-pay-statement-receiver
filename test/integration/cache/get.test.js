const { get, set } = require('../../../app/cache')

const getCache = require('../../../app/cache/get-cache')

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

  await set(getCache(request), key, value)
})

afterEach(async () => {
  jest.resetAllMocks()
})

afterAll(async () => {
  // clear cache
})

describe('get cache', () => {
  test('GET /get route should return defined', async () => {
    console.log('dsdsd', request)
    const result = await get(request, key)
    expect(result).toBeDefined()
  })

  //   test('GET /get route should return 1 item', async () => {
  //     const result = await get(request, key)
  //     expect(result).toHaveLength(1)
  //   })

  //   test('GET /get route should return value', async () => {
  //     const result = await get(request, key)
  //     expect(result).toBe(value)
  //   })

  //   test('GET /get route should return null when no cache value matching key', async () => {
  //     key = 'Key name not in cache'
  //     const result = await get(request, key)
  //     expect(result).toBeNull()
  //   })
})
