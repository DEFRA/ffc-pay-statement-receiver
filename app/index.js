const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  console.log('caching...')
  server.app.cache.set('willThisWork', 'dwdssfsf')
  console.log('set')
  const res = server.app.cache.get('willThisWork')
  console.log('cache res', res)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
