const getCache = async (request) => {
  console.log('Getting cache key: Web')
  console.log(request)
  const res = await request.server.app.cache.get('Web')
  console.log('Cache: ', request.server.app.cache)
  console.log('Settings: ', request.server.app.cache._cache.connection.settings)
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
