require('./insights').setup()

const Hapi = require('@hapi/hapi')
const config = require('./config')

const server = Hapi.server({
  port: process.env.PORT,
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

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/cache')
)

server.route(routes)

module.exports = server
