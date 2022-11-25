require('./insights').setup()

const Hapi = require('@hapi/hapi')
const config = require('./config')
const catbox = config.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    name: config.cache.cacheName,
    provider: {
      constructor: catbox,
      options: config.catboxOptions
    }
  }]
})

const cache = server.cache({ cache: config.cache.cacheName, segment: config.cache.segment, expiresIn: config.cache.ttl })
server.app.cache = cache

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/cache')
)

server.route(routes)

module.exports = server
