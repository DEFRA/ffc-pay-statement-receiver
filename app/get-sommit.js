const { get } = require('./cache')

const getSommit = async (request, key) => {
  try {
    const res = await get(request, key)
    if (res) {
      console.log('Using existing cache value')
      return res
    }
    return 'mock read through cache method to be created and called'
  } catch {
    return undefined
  }
}

module.exports = getSommit
