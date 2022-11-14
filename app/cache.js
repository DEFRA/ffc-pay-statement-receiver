const get = async (request) => {
  const res = await request.server.app.cache.get('willThisWork')
  console.log(res)
}

const set = async (request, value) => {
  await request.server.app.cache.set('willThisWork', value)
}

module.exports = {
  get,
  set
}
