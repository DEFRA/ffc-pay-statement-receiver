const wreck = require('@hapi/wreck')
const config = require('./config')

const get = async (url, token) => {
  return wreck.get(`${config.statementsEndpoint}${url}`, getConfiguration(token))
}

const post = async (url, data, token) => {
  const { payload } = await wreck.post(`${config.statementsEndpoint}${url}`, {
    payload: data,
    ...getConfiguration(token)
  })
  return payload
}

const getConfiguration = (token) => {
  return {
    headers: {
      Authorization: token ?? ''
    },
    json: true
  }
}

module.exports = {
  get,
  post
}
