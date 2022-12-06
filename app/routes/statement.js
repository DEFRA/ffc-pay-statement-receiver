const joi = require('joi')
const boom = require('@hapi/boom')

const { getFileStream } = require('../storage')
const { get, set } = require('../cache')

const streamToBuffer = require('../stream-to-buffer')

module.exports = {
  method: 'GET',
  path: '/statement/{version}/{filename}',
  options: {
    validate: {
      params: joi.object({
        version: joi.string(),
        filename: joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const filename = request.params.filename

    try {
      const cachedFile = await get(request, filename)
      if (cachedFile) {
        console.log(`Cached file found for: ${filename}`)

        return h.response(Buffer.from(cachedFile))
          .type('application/pdf')
          .header('Connection', 'keep-alive')
          .header('Content-Disposition', `attachment;filename=${filename}`)
          .code(200)
      }

      console.log('No cached file found, retrieving from storage')

      const fileStream = await getFileStream(filename)
      const fileBuffer = await streamToBuffer(fileStream.readableStreamBody)

      await set(request, filename, fileBuffer)

      return h.response(fileBuffer)
        .type('application/pdf')
        .header('Connection', 'keep-alive')
        .header('Cache-Control', 'no-cache')
        .header('Content-Disposition', `attachment;filename=${filename}`)
        .code(200)
    } catch (err) {
      return boom.badRequest(err)
    }
  }
}
