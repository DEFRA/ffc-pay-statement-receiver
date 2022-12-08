const Joi = require('joi')

const filenameRegex = require('../../constants/filename-regex')

module.exports = {
  filename: Joi.string().pattern(filenameRegex).required()
}
