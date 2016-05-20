module.exports = {
    url,
    parse
}

function url(word) {
    return `https://www.shanbay.com/api/v1/bdc/search/?word=${word}`
}

function parse(res) {
    res = JSON.parse(res)

    if (res.status_code) {
        return {
            err: 'Not Found'
        }
    }

    var data = res.data

    return {
        word: data.content,
        pronunciations: data.pronunciations,
        cn_definitions: data.cn_definition.defn.trim().split('\n'),
        en_definitions: data.en_definitions,
        audio_address: {
            uk: data.uk_audio,
            us: data.us_audio
        }
    }
}
