# dict-en-zh

An English-Chinese dictionary.

### Install

```
npm install dict-en-zh
```

### Usage

as a command:

```
dict <word>
```

as a module:

```javascript
const dict = require(dict-en-zh)

dict('hello')
    .then(console.log)
    .catch(console.trace)
```

### License

MIT
