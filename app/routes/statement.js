const { getFileStream } = require('../storage')
const joi = require('joi')
const boom = require('@hapi/boom')

module.exports = {
  method: 'GET',
  path: '/statement/{version}/{filename}',
  handler: async (request, h) => {
    const filename = request.params.filename

    try {
      const statementFile = await getFileStream(filename)
      return h.response(statementFile.readableStreamBody)
        .type('application/pdf')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', `attachment;filename=${filename}`)
        .code(200)
    } catch (err) {
      return boom.badRequest(err)
    }
  },
  options: {
    validate: {
      params: joi.object({
        version: joi.string(),
        filename: joi.string().required()
      })
    }
  }
}
