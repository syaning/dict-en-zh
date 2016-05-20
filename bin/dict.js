#!/usr/bin/env node

const chalk = require('chalk')
const argv = require('optimist').argv
const dict = require('../index')

var word = argv._[0]

if (!word) {
    console.log('dict <word>')
    return
}

var indent = str => '  ' + str
var ul = str => '- ' + str
var title = str => '# ' + str

dict(word)
    .then(data => {
        if (data.err) {
            return console.log(chalk.red(data.err))
        }

        console.log(chalk.green('\n' + indent(data.word) + '\n'))

        var pronunciations = Object.keys(data.pronunciations)
            .map(k => indent(ul(k + ' ')) + chalk.yellow('[' + data.pronunciations[k] + ']'))
            .join('\n')
        console.log(chalk.gray(title('pronunciations')) + '\n')
        console.log(pronunciations, '\n')

        var cn_definitions = data.cn_definitions.map(def => indent(ul(def))).join('\n')
        console.log(chalk.gray(title('cn definitions')) + '\n')
        console.log(cn_definitions, '\n')

        var en_definitions = []
        Object.keys(data.en_definitions).forEach(k => {
            var defs = data.en_definitions[k]
            defs.forEach(def => {
                en_definitions.push(indent(ul(k + '. ' + def)))
            })
        })
        en_definitions = en_definitions.join('\n')
        console.log(chalk.gray(title('en definitions')) + '\n')
        console.log(en_definitions)
    })
    .catch(console.trace)
