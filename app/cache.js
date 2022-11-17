const get = async (request) => {
  console.log('Getting cache key: Web')
  const res = await request.server.app.cache.get('Web')
  console.log('Result:', res)
  return res
}

const set = async (request, value) => {
  console.log('Populating cache key: Web')
  await request.server.app.cache.set('Web', value)
}

module.exports = {
  get,
  set
}
