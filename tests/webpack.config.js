var Webpack2Polyfill = require("../");

module.exports = {
  entry:'./index.js',
  output:{
    path:'./',
    filename:'index.output.js',
    pathinfo:true,
  },
  plugins:[
    new Webpack2Polyfill()
  ]
};
