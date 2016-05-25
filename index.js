const request = require('./lib/request')
const shanbay = require('./lib/source/shanbay')
const youdao = require('./lib/source/youdao')

function dict(word, source) {
  source = source || 'shanbay'

  if (typeof dict[source] !== 'function') {
    throw new Error('Unknown dictionary source: ' + source)
  }

  return dict[source](word)
}

function registerSources(sources) {
  Object.keys(sources).forEach(name => {
    var source = sources[name]
    var url = source.url
    var parse = source.parse

    if (typeof url !== 'function' || typeof parse !== 'function') {
      throw new Error('Invalid dictionary source: ' + name)
    }

    sources[name] = function(word) {
      return request(url(word)).then(res => parse(res, word))
    }
  })
}

var sources = {
  shanbay,
  youdao
}

registerSources(sources)
Object.assign(dict, sources)

module.exports = dict
