const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/get',
  handler: async (request, h) => {
    const res = await cache.get(request)
    return h.response(res).code(200)
  }
},
{
  method: 'GET',
  path: '/set',
  handler: async (request, h) => {
    await cache.set(request, `Value gotten from web get with timestamp: ${new Date().toString()}`)
    return h.response('ok').code(200)
  }
}]
