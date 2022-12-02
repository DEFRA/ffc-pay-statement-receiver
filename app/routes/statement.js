const { getFileStream } = require('../storage')
const { get, set } = require('../cache')
const joi = require('joi')
const boom = require('@hapi/boom')

module.exports = {
  method: 'GET',
  path: '/statement/{version}/{filename}',
  handler: async (request, h) => {
    const filename = request.params.filename

    try {
      // check if file is in cache
      const cachedFile = await get(request, filename)
      if (cachedFile) {
        console.log(`Cached file found for: ${filename}`)
        return h.response(cachedFile.blobDownloadStream.source)
          .type('application/pdf')
          .header('Content-Disposition', `attachment;filename=${filename}`)
          .code(200)
      } else {
        console.log('No cached file found, retrieving from storage')
        const statementFile = await getFileStream(filename)
        await set(request, filename, statementFile)
        return h.response(statementFile.readableStreamBody)
          .type('application/pdf')
          .header('Connection', 'keep-alive')
          .header('Cache-Control', 'no-cache')
          .header('Content-Disposition', `attachment;filename=${filename}`)
          .code(200)
      }
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
