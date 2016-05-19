module.exports = {
    url,
    parse
}

function url(word) {
    return `https://www.shanbay.com/api/v1/bdc/search/?word=${word}`
}

function parse(res) {
    return JSON.parse(res).data
}
