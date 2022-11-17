const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/get',
  handler: (request, h) => {
    const statement = await cache.get(request) ?? undefined
    console.log(statement)
    return h.response('ok').code(200)
  }
},
{
  method: 'GET',
  path: '/set',
  handler: (request, h) => {
    await cache.set(request, 'fbsdfsfw')
    return h.response('ok').code(200)
  }
}]
