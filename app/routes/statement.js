const Boom = require('@hapi/boom')

const schema = require('./schemas/statement')

const getReadThroughStatement = require('../statement')

module.exports = {
  method: 'GET',
  path: '/statement/{version}/{filename}',
  options: {
    validate: {
      params: schema,
      failAction: async (request, h, error) => {
        return Boom.notFound(error)
      }
    }
  },
  handler: async (request, h) => {
    const filename = request.params.filename

    try {
      const statement = await getReadThroughStatement(request, request.params.filename)

      return h.response(statement)
        .type('application/pdf')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', `attachment;filename=${filename}`)
        .code(200)
    } catch (err) {
      return Boom.badRequest(err)
    }
  }
}
