#!/usr/bin/env node

const chalk = require('chalk')
const argv = require('optimist').argv
const dict = require('../index')

var srcMap = {
  sb: 'shanbay',
  shanbay: 'shanbay',
  yd: 'youdao',
  youdao: 'youdao'
}

var help = [
  'usage: dict <word> [options]',
  '',
  'options:',
  '  -s --src\tspecify a source for query',
  '  -h --help\tprint this list and exit',
  '',
  'sources:',
  '  sb shanbay\thttps://www.shanbay.com/',
  '  yd youdao\thttp://dict.youdao.com/'
].join('\n')

var word = argv._[0]
if (!word || argv.h || argv.help) {
  console.log(help)
  return
}

var src = argv.s || argv.src
src = srcMap[src] || srcMap.shanbay

dict[src](word)
  .then(data => {
    if (data.err) {
      return console.log(chalk.red(data.err))
    }

    console.log(chalk.green('\n' + indent(data.word) + '\n'))

    var pron = data.pron
    var prons = Object.keys(pron).filter(k => !!pron[k])
    if (prons.length) {
      prons = prons.map(k => k + ' ' + chalk.yellow(pron[k]))
      console.log(title('pronunciations'))
      console.log(indent(ul(prons)).join('\n') + '\n')
    }

    var cnDefs = data.def.cn
    if (cnDefs.length) {
      console.log(title('cn definitions'))
      console.log(indent(ul(cnDefs)).join('\n') + '\n')
    }

    var enDefs = data.def.en
    var poses = Object.keys(enDefs)
    if (poses.length) {
      console.log(title('en definitions'))
      poses.forEach(pos => {
        console.log(pos)
        var defs = indent(ul(enDefs[pos])).join('\n')
        console.log(defs)
      })
    }
  })
  .catch(console.trace)

function title(str) {
  return chalk.gray('# ' + str + '\n')
}

function ul(str) {
  return Array.isArray(str) ? str.map(ul) : '- ' + str
}

function indent(str) {
  return Array.isArray(str) ? str.map(indent) : '  ' + str
}
