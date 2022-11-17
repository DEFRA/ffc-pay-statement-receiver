const getCacheValue = async (cache, key) => {
  console.log(`Getting cache value for key: ${key}`)
  return cache.get(key)
}

module.exports = getCacheValue
