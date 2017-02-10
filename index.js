var ConcatSource = require("webpack-sources").ConcatSource;
var objectAssign = require("object-assign");
var snippetGenerator = require("./lib/snippetGenerator");

function Webpack2Polyfill(options){
  this.options = objectAssign({
    "Promise":                 true,
    "Function.prototype.bind": true,
    "Object.keys":             true,
    "Object.defineProperty":   true
  },options||{})

}

function comments(str){
  return "/** ===== " + str + " ===== **/";
}

Webpack2Polyfill.prototype.apply = function(compiler){
  var options = this.options;
  compiler.plugin("compilation", function(compilation){
    compilation.mainTemplate.plugin("bootstrap", function(prevSource){
      var source = new ConcatSource("");

      var snippets = [
        "var _global = this;",
        "var module = undefined;" //avoid polyfill using commonjs
      ];
      
      if(options["Function.prototype.bind"]){
        snippets.push(this.asString([
          comments("Function.prototype.bind Polyfill"),
          snippetGenerator(require.resolve("./lib/raw/function.bind.raw.js")),
          comments("Function.prototype.bind Polyfill end")
        ]));
      }

      if(options["Object.keys"]){
        snippets.push(this.asString([
          comments("Object.keys Polyfill"),
          snippetGenerator(require.resolve("./lib/raw/object.keys.raw.js")),
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

      if(options["Object.defineProperty"]){
        snippets.push(this.asString([
          comments("Object.defineProperty Polyfill"),
          snippetGenerator(require.resolve("./lib/raw/object.defineProperty.raw.js")),
          comments("Object.defineProperty Polyfill end")
        ]));
      }

      source.add(this.asString([
        comments("Webpack2 Polyfill"),
        "(function(){",
        this.indent(snippets),
        "}).call((function(){",
        "if(typeof window != \"undefined\") return window;",
        "if(typeof global != \"undefined\") return global;",
        "if(typeof self != \"undefined\") return self;",
        "})())",
        comments("Webpack2 Polyfill end")
      ]));

      return source.source() + prevSource;
    });
  });

};

module.exports = Webpack2Polyfill;
