const Joi = require('joi')

module.exports = {
  version: Joi.string().required()
    .messages({
      'string.base': 'Version must be a string.',
      'any.required': 'A version must be provided.'
    })
}
