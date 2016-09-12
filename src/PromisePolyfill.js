var fs = require("fs");
var stripComments = require("strip-json-comments");

function PromisePolyfill(){}

PromisePolyfill.prototype.toString = function(){
  return stripComments(fs.readFileSync(require.resolve("promise-polyfill"), {encoding: "utf8"}));
}

module.exports = PromisePolyfill;
