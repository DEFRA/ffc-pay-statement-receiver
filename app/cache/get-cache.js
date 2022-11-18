const getCache = (request) => {
  // console.log('dsfdsjhfdgfdgsr', request.server)
  return request.server.app.cache
}

module.exports = getCache
