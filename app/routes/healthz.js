const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: (request, h) => {
    cache.set(request, 'fbsdfsfw')
    return h.response('ok').code(200)
  }
}
