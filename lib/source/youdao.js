const cheerio = require('cheerio')

module.exports = {
  url,
  parse
}

function url(word) {
  return `http://dict.youdao.com/w/${word}`
}

function parse(html, word) {
  var $ = cheerio.load(html)
  var errEle = $('#results-contents .error-wrapper')

  if (errEle.length) {
    return {
      word,
      err: 'Not Fount'
    }
  }

  var prons = map($('.pronounce .phonetic'), ele => $(ele).text())
  var cnDefs = map($('#phrsListTab .trans-container li'), ele => $(ele).text())
  var enDefsEle = $('#tEETrans .trans-container > ul > li')
  var enDefs = {}
  forEach(enDefsEle, ele => {
    var pos = $('.pos', ele).text()
    var defs = map($('.def', ele), ele => $(ele).text())
    enDefs[pos] = defs
  })

  return {
    word,
    pron: {
      uk: prons[0] || '',
      us: prons[1] || prons[0] || ''
    },
    def: {
      cn: cnDefs,
      en: enDefs
    },
    audio: {
      uk: `http://dict.youdao.com/dictvoice?audio=${word}&type=1`,
      us: `http://dict.youdao.com/dictvoice?audio=${word}&type=2`
    }
  }
}

function map(arr, fn) {
  return [].map.call(arr, fn)
}

function forEach(arr, fn) {
  return [].forEach.call(arr, fn)
}
