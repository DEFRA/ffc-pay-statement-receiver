require('./insights').setup()

const hapi = require('@hapi/hapi')
const config = require('./config')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    cache: [{
      name: config.cache.cacheName,
      provider: {
        constructor: config.cache.catbox,
        options: config.cache.catboxOptions
      }
    }]
  })
  const cache = server.cache({ cache: config.cache.cacheName, segment: config.cache.segment, expiresIn: config.cache.ttl })
  server.app.cache = cache
  // Register the plugins
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/logging'))
  if (config.isDev) {
    await server.register(require('blipp'))
  }

  return server
}

module.exports = createServer
