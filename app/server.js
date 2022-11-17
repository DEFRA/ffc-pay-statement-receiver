const config = require('./config')

const Hapi = require('@hapi/hapi')
const catbox = config.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

require('./insights').setup()

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    name: config.cacheName,
    provider: {
      constructor: catbox,
      options: { ...config.catboxOptions, port: 6379, tls: {} }
    }
  }]
})

const cache = server.cache({ cache: config.cacheName, segment: 'st', expiresIn: 9999 })
server.app.cache = cache

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/cache')
)

server.route(routes)

module.exports = server
