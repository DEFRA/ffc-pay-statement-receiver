const server = require('./server')

const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)

  console.log('Populating cache key: Test')
  await server.app.cache.set('Test', 'Initial cache value from init')
  console.log('Populated')
  console.log('Testing retreival cache key: Test')
  const res = await server.app.cache.get('Test')
  console.log('Result:', res)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
