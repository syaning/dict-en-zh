module.exports = {
    url,
    parse
}

function url(word) {
    return `https://www.shanbay.com/api/v1/bdc/search/?word=${word}`
}

function parse(res, word) {
    res = JSON.parse(res)

    if (res.status_code) {
        return {
            word,
            err: 'Not Found'
        }
    }

    var data = res.data
    var prons = data.pronunciations
    var en_definitions = data.en_definitions
    var enDefs = {}
    Object.keys(en_definitions).forEach(k => {
        enDefs[k + '.'] = en_definitions[k]
    })

    return {
        word: data.content,
        pron: {
            uk: prons.uk ? '[' + prons.uk + ']' : '',
            us: prons.us ? '[' + prons.us + ']' : ''
        },
        def: {
            cn: data.cn_definition.defn.trim().split('\n'),
            en: enDefs
        },
        audio: {
            uk: data.uk_audio,
            us: data.us_audio
        }
    }
}
