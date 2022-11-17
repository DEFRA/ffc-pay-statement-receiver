const getCache = async (request) => {
  console.log('Getting cache key: Web')
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
  await request.server.app.cache.set('Web', value)
}

module.exports = {
  get,
  set
}
