const Joi = require('joi')

const filenameRegex = require('../../constants/filename-regex')

module.exports = {
  filename: Joi.string().pattern(filenameRegex).required()
    .messages({
      'string.pattern.base': 'Filename must end in .pdf.',
      'any.required': 'A filename must be provided.'
    })
}
