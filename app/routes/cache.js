const getSommit = require('../get-sommit')
const { set } = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/get',
  handler: async (request, h) => {
    const res = await getSommit(request, 'Web')
    return h.response(res).code(200)
  }
},
{
  method: 'GET',
  path: '/set',
  handler: async (request, h) => {
    await set(request, 'Web', `Value gotten from web get with timestamp ${new Date().toString()}`)
    return h.response('ok').code(200)
  }
}]
