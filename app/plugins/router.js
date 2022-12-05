const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/statement'),
  require('../routes/cache')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route(routes)
    }
  }
}
