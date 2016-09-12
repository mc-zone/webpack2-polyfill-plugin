# Webpack2 Polyfill

Provide Polyfills of Webpack2

## Includes:
* Promise
* Function.prototype.bind
* Object.keys

See:[What's new in webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7?utm_source=javascriptweekly&amp;utm_medium=email#minor-breaking-changes)

## How to use:

step 1. Install

`npm install webpack2-polyfill --save`

step 2. Use plugin at your webpack config

```javascript

module.exports = {

  //...

  plugins:[
    new Webpack2Polyfill()
  ]
};
```

## License

MIT
