const getCache = require('./get-cache')
const getCacheValue = require('./get-cache-value')

const get = async (request, key) => {
  try {
    const res = await getCacheValue(getCache(request), key)
    if (res) {
      console.log('Using existing cache value')
      return res
    }
    return 'mock read through cache method to be created and called'
  } catch {
    return undefined
  }
}

module.exports = get
