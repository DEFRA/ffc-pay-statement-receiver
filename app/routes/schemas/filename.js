const Joi = require('joi')

module.exports = {
  filename: Joi.string().required()
}
