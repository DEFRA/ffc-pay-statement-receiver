const { endpointEnabled } = require('../config')

module.exports = {
  plugin: {
    name: 'enabled',
    register: (server) => {
      server.ext('onRequest', (request, h) => {
        if (!endpointEnabled) {
          return h.response('Service is intentionally disabled in this environment').code(503).takeover()
        }
        return h.continue
      })
    }
  }
}
