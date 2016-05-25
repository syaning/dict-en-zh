const request = require('request')

module.exports = sendRequest

function sendRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      err ? reject(err) : resolve(body)
    })
  })
}
