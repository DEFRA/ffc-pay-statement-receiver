const Joi = require('joi')

module.exports = {
  version: Joi.string()
    .messages({ 'string.base': 'Version must be provided as a string' })
}
