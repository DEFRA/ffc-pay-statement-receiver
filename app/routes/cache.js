const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/get',
  handler: (request, h) => {
    const statement = cache.get(request) ?? undefined
    console.log(statement)
    return h.response('ok').code(200)
  }
},
{
  method: 'GET',
  path: '/set',
  handler: (request, h) => {
    cache.set(request, 'fbsdfsfw')
    return h.response('ok').code(200)
  }
}]
