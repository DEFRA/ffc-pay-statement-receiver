const getCacheValue = async (cache, key) => {
  console.log(`Getting cache value for key: ${key}`)
  try {
    return await cache.get(key)
  } catch (err) {
    return undefined
  }
}

module.exports = getCacheValue
