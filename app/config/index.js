const cacheConfig = require('./cache')
const joi = require('joi')
const storageConfig = require('./storage')

// Define config schema
const schema = joi.object({
  env: joi.string().valid('development', 'test', 'production').default('development'),
  port: joi.number().default(3000),
  endpointEnabled: joi.boolean().default(true)
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  endpointEnabled: process.env.ENDPOINT_ENABLED
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

value.isDev = (value.env === 'development' || value.env === 'test')
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

value.storageConfig = storageConfig

value.useRedis = !(value.isTest || cacheConfig.host === undefined)

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.cache = cacheConfig
value.cache.catboxOptions = value.useRedis
  ? {
      ...cacheConfig.catboxOptions,
      tls: value.isDev ? undefined : {}
    }
  : {}
value.cache.catbox = value.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')

module.exports = value
