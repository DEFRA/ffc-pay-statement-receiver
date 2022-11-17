const getCache = require('./get-cache')
const getCacheValue = require('./get-cache-value')

const get = async (request, key) => {
  const res = await getCacheValue(getCache(request), key)
  if (res) {
    console.log('Using existing cache value')
    return res
  }
}

module.exports = get
