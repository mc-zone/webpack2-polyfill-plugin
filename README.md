# Webpack2 Polyfill [![Build Status](https://travis-ci.com/mc-zone/webpack2-polyfill.svg?token=Yy6bJ3JCpXQzAa99s2SH)](https://travis-ci.com/mc-zone/webpack2-polyfill.svg?token=Yy6bJ3JCpXQzAa99s2SH) 

Provide Polyfills of Webpack2

## Includes:
* Promise
* Function.prototype.bind
* Object.keys
* Object.defineProperty (__defineGetter__/__defineSetter__)

See:[What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7?utm_source=javascriptweekly&amp;utm_medium=email#minor-breaking-changes)

## How to use:

step 1. Install

`npm install webpack2-polyfill --save`

step 2. Use plugin at your webpack config

```javascript
var Webpack2Polyfill = require("webpack2-polyfill");

module.exports = {

  //...

  plugins: [
    new Webpack2Polyfill()
  ]
};
```

## Compatible:

IE.9 and above (Currently)

## Why not IE8 ?

IE8 can't use Object.defineProperty with non-DOM Object. So can't do polyfill with some [Webpack2 Usage](https://gist.github.com/sokra/27b24881210b56bbaff7?utm_source=javascriptweekly&amp;utm_medium=email#other-polyfills) (Ex: Using defineProperty at `exports` for Harmony Export).

## License

MIT
