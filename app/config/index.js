const joi = require('joi')
const storageConfig = require('./storage')

// Define config schema
const schema = joi.object({
  env: joi.string().valid('development', 'test', 'production').default('development'),
  port: joi.number().default(3000)
})

// Build config
const config = {
  env: process.env.NODE_ENV
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
