const { getFileStream } = require('../storage')

module.exports = {
  method: 'GET',
  path: '/FfcApi/statement',
  handler: async (request, h) => {
    const filename = request.query.filename

    if (!filename) {
      return h.response('no_filename').code(404)
    }

    try {
      const statementFile = await getFileStream(filename)
      console.log(statementFile.length)
      return h.response('staement here').code(200)
    } catch (err) {
      return h.response(err.message).code(404)
    }
  }
}
