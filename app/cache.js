const util = require('util')

const getCache = async (request) => {
  console.log('Getting cache key: Web')
  console.log(util.inspect(request, false, null, true))
  const res = await request.server.app.cache.get('Web')
  return res
}

const get = async (request) => {
  const res = await getCache(request)
  if (res) {
    console.log('Using existing cache value')
    return res
  }
}

const set = async (request, value) => {
  console.log('Populating cache key: Web')
  await request.server.app.cache.set('Web', value, 99999)
}

module.exports = {
  get,
  set
}
