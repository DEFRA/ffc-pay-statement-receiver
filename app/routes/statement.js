const { getFileStream } = require('../storage')

module.exports = {
  method: 'GET',
  path: '/statement/{version}/{filename}',
  handler: async (request, h) => {
    const filename = request.params.filename

    if (!filename) {
      return h.response('no_filename').code(404)
    }

    try {
      const statementFile = await getFileStream(filename)
      return h.response(statementFile.readableStreamBody)
        .type('application/pdf')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', `attachment;filename=${filename}`)
        .code(200)
    } catch (err) {
      return h.response(err.message).code(404)
    }
  }
}
