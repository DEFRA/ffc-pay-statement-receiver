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
      options: config.catboxOptions
    }
  }]
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz')
)

server.route(routes)

module.exports = server
