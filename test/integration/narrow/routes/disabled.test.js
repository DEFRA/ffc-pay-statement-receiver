const config = require('../../../../app/config')
config.endpointEnabled = false
const createServer = require('../../../../app/server')
let server

describe('Disabled endpoint', () => {
  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /statement/{version}/{filename} route returns 503 if endpoint disabled', async () => {
    const options = {
      method: 'GET',
      url: '/statement/v1/FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(503)
  })

  test('GET /statement/{version}/{filename} route returns disabled message if endpoint disabled', async () => {
    const options = {
      method: 'GET',
      url: '/statement/v1/FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'
    }

    const response = await server.inject(options)
    expect(response.payload).toBe('Service is intentionally disabled in this environment')
  })

  test('GET /healthy route returns 200 if endpoint disabled', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /healthz route returns 200 if endpoint disabled', async () => {
    const options = {
      method: 'GET',
      url: '/healthz'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })
})
