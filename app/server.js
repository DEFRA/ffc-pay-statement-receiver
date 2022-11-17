const config = require('./config')

const Hapi = require('@hapi/hapi')
const catbox = config.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

require('./insights').setup()

console.log(config.catboxOptions)

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    name: config.cache.cacheName,
    provider: {
      constructor: catbox,
      options: { ...config.catboxOptions, port: 6379, db: 0 }
    }
  }]
})

const cache = server.cache({ cache: config.cache.cacheName, segment: 'st', expiresIn: 9999 })
server.app.cache = cache

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/cache')
)

server.route(routes)

module.exports = server
