const Joi = require('joi')
const cacheConfig = require('./cache')

const schema = Joi.object({
  port: Joi.number().integer().default(3000),
  env: Joi.string().valid('development', 'test', 'production').default('development')
})

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value

value.isDev = (value.env === 'development' || value.env === 'test')
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

// value.useRedis = !value.isTest && value.redisHost !== undefined
value.useRedis = true
// value.useRedis = !(value.isTest || value.redisHost === undefined)

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.cache = cacheConfig
value.catboxOptions = {
  ...cacheConfig.catboxOptions,
  tls: value.isDev ? undefined : {}
}

console.log('port:', value.catboxOptions.port, 'tls:', value.catboxOptions.tls)

module.exports = value
