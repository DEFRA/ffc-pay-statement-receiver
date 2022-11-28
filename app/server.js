require('./insights').setup()
const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const server = Hapi.server({
  port: process.env.PORT
})

server.route(routes)

module.exports = server
