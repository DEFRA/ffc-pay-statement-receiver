const config = require('../config')

const setCacheValue = async (cache, key, value) => {
  console.log(`Populating cache key: value with: ${key}:${value}`)
  await cache.set(key, value, config.cache.ttl)
}

module.exports = setCacheValue
