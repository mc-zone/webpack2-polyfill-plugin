var ConcatSource = require("webpack-sources").ConcatSource;
var objectAssign = require("object-assign");
var snippetGenerator = require("./snippetGenerator");

function Webpack2Polyfill(options){
  this.options = objectAssign({
    "Function.prototype.bind": true,
    "Object.keys":             true,
    "Promise":                 true,
    //"harmonyExport": true
  },options||{})

}

function comments(str){
  return "\n/** ===== " + str + " ===== **/\n";
}

Webpack2Polyfill.prototype.apply = function(compiler){
  var options = this.options;
  compiler.plugin("compilation", function(compilation){
    compilation.mainTemplate.plugin("bootstrap", function(prevSource){
      var source = new ConcatSource("");

      var snippets = [];
      
      if(options["Function.prototype.bind"]){
        snippets.push(this.asString([
          comments("Function.prototype.bind Polyfill"),
          snippetGenerator(require.resolve("./function.bind.raw.js")),
          comments("Function.prototype.bind Polyfill end")
        ]));
      }

      if(options["Object.keys"]){
        snippets.push(this.asString([
          comments("Object.keys Polyfill"),
          snippetGenerator(require.resolve("./object.keys.raw.js")),
          comments("Object.keys Polyfill end")
        ]));
      }

      if(options["Promise"]){
        snippets.push(this.asString([
          comments("Promise Polyfill"),
          "if(!_global.Promise){",
          this.indent([
            snippetGenerator(require.resolve("promise-polyfill")),
          ]),
          "}",
          comments("Promise Polyfill end")
        ]));
      }

      source.add(comments("Webpack2 Polyfill"));
      source.add(this.asString([
        "(function(_global){",
        this.indent(snippets),
        "}).call(window || global, window || global);"
      ]));
      source.add(comments("Webpack2 Polyfill end"));

      return source.source() + prevSource;
    });
  });

};

module.exports = Webpack2Polyfill;
