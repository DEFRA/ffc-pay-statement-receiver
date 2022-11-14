const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/healthy',
  handler: (request, h) => {
    const statement = cache.get(request) ?? undefined
    console.log(statement)
    return h.response('ok').code(200)
  }
}
