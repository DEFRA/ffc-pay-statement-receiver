const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/get',
  handler: async (request, h) => {
    const statement = await cache.get(request) ?? undefined
    console.log(statement)
    return h.response('ok').code(200)
  }
},
{
  method: 'GET',
  path: '/set',
  handler: async (request, h) => {
    await cache.set(request, 'fbsdfsfw')
    return h.response('ok').code(200)
  }
}]
