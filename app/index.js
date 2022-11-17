const server = require('./server')
// const { initialiseContainers } = require('./storage')
const init = async () => {
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})


module.exports = (async () => {
  // initialiseContainers()
  init()
})()