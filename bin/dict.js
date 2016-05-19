#!/usr/bin/env node

const argv = require('optimist').argv
const dict = require('../index')

var word = argv._[0]

if (!word) {
    console.log('dict <word>')
    return
}

dict(word)
    .then(data => console.log(data.cn_definition.defn))
    .catch(console.trace)
