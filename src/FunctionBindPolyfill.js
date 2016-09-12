var fs = require("fs");
var stripComments = require("strip-json-comments");

function FunctionBindPolyfill(){}

FunctionBindPolyfill.prototype.toString = function(){
  return stripComments(fs.readFileSync(require.resolve("./function.bind.raw.js"), {encoding: "utf8"}));
}

module.exports = FunctionBindPolyfill;
