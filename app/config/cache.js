const Joi = require('joi')

const TTL = 3600 * 1000 * 6 // 6 hours

const schema = Joi.object({
  host: Joi.string(),
  port: Joi.number().integer().default(6379),
  password: Joi.string().allow(''),
  partition: Joi.string().default('ffc-pay-statement-receiver'),
  ttl: Joi.number().default(TTL),
  cacheName: Joi.string().default('statements')
//   staticCacheTimeoutMillis: Joi.number().default(15 * 60 * 1000),
//   restClientTimeoutMillis: Joi.number().default(20000),
})

const config = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  partition: process.env.REDIS_PARTITION,
  ttl: process.env.REDIS_TTL,
  cacheName: process.env.REDIS_CACHE_NAME
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The cache config is invalid. ${result.error.message}`)
}

const value = result.value

value.catboxOptions = {
  host: value.host,
  port: value.port,
  password: value.password,
  partition: value.partition
}

module.exports = value
