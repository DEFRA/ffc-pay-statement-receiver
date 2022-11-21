const joi = require('joi')
const storageConfig = require('./storage')

// Define config schema
const schema = joi.object({
  env: joi.string().valid('development', 'test', 'production').default('development'),
  statementsEndpoint: joi.string().uri().required(),
  ffcApiPath: joi.string().uri().required()
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  statementsEndpoint: process.env.STATEMENTS_RECEIVER_ENDPOINT,
  ffcApiPath: process.env.FFC_API_PATH
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

value.storageConfig = storageConfig

module.exports = value
