const Joi = require('joi')

const filenameRegex = require('../../constants/filename-regex')

module.exports = {
  filename: Joi.string().pattern(filenameRegex).required()
    .messages({
      'string.pattern.base': `Filename does not match the regular expression pattern of: ${filenameRegex}.`,
      'any.required': 'A filename must be provided.'
    })
}
