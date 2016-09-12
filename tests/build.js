var webpack = require("webpack");
var Webpack2Polyfill = require("../");

var config = {
  entry:'./index.js',
  output:{
    path:'./',
    filename:'index.output.js',
    chunkFilename: '[name].chunk.js',
    pathinfo:true,
  },
  plugins:[
    new Webpack2Polyfill()
  ]
};

webpack(config).run(function(err, stats){
  if(err){
    console.error(err)
  }else{
    console.log(stats.toString({
      colors:true
    }))
  }
})
