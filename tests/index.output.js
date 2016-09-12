/******/ (function(modules) { // webpackBootstrap
/******/ 	/** ===== Webpack2 Polyfill ===== **/
/******/ 	(function(_global){

/******/ 		/** ===== Function.prototype.bind Polyfill ===== **/

/******/ 		if (!Function.prototype.bind) {
/******/ 		  Function.prototype.bind = function(oThis) {
/******/ 		    if (typeof this !== 'function') {
/******/ 		                                                   
/******/ 		                                     
/******/ 		      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
/******/ 		    }

/******/ 		    var aArgs   = Array.prototype.slice.call(arguments, 1),
/******/ 		        fToBind = this,
/******/ 		        fNOP    = function() {},
/******/ 		        fBound  = function() {
/******/ 		          return fToBind.apply(this instanceof fNOP
/******/ 		                 ? this
/******/ 		                 : oThis,
/******/ 		                 aArgs.concat(Array.prototype.slice.call(arguments)));
/******/ 		        };

/******/ 		    if (this.prototype) {
/******/ 		                                                             
/******/ 		      fNOP.prototype = this.prototype; 
/******/ 		    }
/******/ 		    fBound.prototype = new fNOP();

/******/ 		    return fBound;
/******/ 		  };
/******/ 		}


/******/ 		/** ===== Function.prototype.bind Polyfill end ===== **/

/******/ 		/** ===== Object.keys Polyfill ===== **/

/******/ 		                                                                                                    
/******/ 		if (!Object.keys) {
/******/ 		  Object.keys = (function() {
/******/ 		    'use strict';
/******/ 		    var hasOwnProperty = Object.prototype.hasOwnProperty,
/******/ 		        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
/******/ 		        dontEnums = [
/******/ 		          'toString',
/******/ 		          'toLocaleString',
/******/ 		          'valueOf',
/******/ 		          'hasOwnProperty',
/******/ 		          'isPrototypeOf',
/******/ 		          'propertyIsEnumerable',
/******/ 		          'constructor'
/******/ 		        ],
/******/ 		        dontEnumsLength = dontEnums.length;

/******/ 		    return function(obj) {
/******/ 		      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
/******/ 		        throw new TypeError('Object.keys called on non-object');
/******/ 		      }

/******/ 		      var result = [], prop, i;

/******/ 		      for (prop in obj) {
/******/ 		        if (hasOwnProperty.call(obj, prop)) {
/******/ 		          result.push(prop);
/******/ 		        }
/******/ 		      }

/******/ 		      if (hasDontEnumBug) {
/******/ 		        for (i = 0; i < dontEnumsLength; i++) {
/******/ 		          if (hasOwnProperty.call(obj, dontEnums[i])) {
/******/ 		            result.push(dontEnums[i]);
/******/ 		          }
/******/ 		        }
/******/ 		      }
/******/ 		      return result;
/******/ 		    };
/******/ 		  }());
/******/ 		}


/******/ 		/** ===== Object.keys Polyfill end ===== **/

/******/ 		/** ===== Promise Polyfill ===== **/

/******/ 		if(!_global.Promise){
/******/ 			(function (root) {

/******/ 			                                                                         
/******/ 			                                                                 
/******/ 			  var setTimeoutFunc = setTimeout;

/******/ 			  function noop() {}
/******/ 			  
/******/ 			                                         
/******/ 			  function bind(fn, thisArg) {
/******/ 			    return function () {
/******/ 			      fn.apply(thisArg, arguments);
/******/ 			    };
/******/ 			  }

/******/ 			  function Promise(fn) {
/******/ 			    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
/******/ 			    if (typeof fn !== 'function') throw new TypeError('not a function');
/******/ 			    this._state = 0;
/******/ 			    this._handled = false;
/******/ 			    this._value = undefined;
/******/ 			    this._deferreds = [];

/******/ 			    doResolve(fn, this);
/******/ 			  }

/******/ 			  function handle(self, deferred) {
/******/ 			    while (self._state === 3) {
/******/ 			      self = self._value;
/******/ 			    }
/******/ 			    if (self._state === 0) {
/******/ 			      self._deferreds.push(deferred);
/******/ 			      return;
/******/ 			    }
/******/ 			    self._handled = true;
/******/ 			    Promise._immediateFn(function () {
/******/ 			      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
/******/ 			      if (cb === null) {
/******/ 			        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
/******/ 			        return;
/******/ 			      }
/******/ 			      var ret;
/******/ 			      try {
/******/ 			        ret = cb(self._value);
/******/ 			      } catch (e) {
/******/ 			        reject(deferred.promise, e);
/******/ 			        return;
/******/ 			      }
/******/ 			      resolve(deferred.promise, ret);
/******/ 			    });
/******/ 			  }

/******/ 			  function resolve(self, newValue) {
/******/ 			    try {
/******/ 			                                                                                                                       
/******/ 			      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
/******/ 			      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
/******/ 			        var then = newValue.then;
/******/ 			        if (newValue instanceof Promise) {
/******/ 			          self._state = 3;
/******/ 			          self._value = newValue;
/******/ 			          finale(self);
/******/ 			          return;
/******/ 			        } else if (typeof then === 'function') {
/******/ 			          doResolve(bind(then, newValue), self);
/******/ 			          return;
/******/ 			        }
/******/ 			      }
/******/ 			      self._state = 1;
/******/ 			      self._value = newValue;
/******/ 			      finale(self);
/******/ 			    } catch (e) {
/******/ 			      reject(self, e);
/******/ 			    }
/******/ 			  }

/******/ 			  function reject(self, newValue) {
/******/ 			    self._state = 2;
/******/ 			    self._value = newValue;
/******/ 			    finale(self);
/******/ 			  }

/******/ 			  function finale(self) {
/******/ 			    if (self._state === 2 && self._deferreds.length === 0) {
/******/ 			      Promise._immediateFn(function() {
/******/ 			        if (!self._handled) {
/******/ 			          Promise._unhandledRejectionFn(self._value);
/******/ 			        }
/******/ 			      });
/******/ 			    }

/******/ 			    for (var i = 0, len = self._deferreds.length; i < len; i++) {
/******/ 			      handle(self, self._deferreds[i]);
/******/ 			    }
/******/ 			    self._deferreds = null;
/******/ 			  }

/******/ 			  function Handler(onFulfilled, onRejected, promise) {
/******/ 			    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
/******/ 			    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
/******/ 			    this.promise = promise;
/******/ 			  }

/******/ 			     
/******/ 			                                                                   
/******/ 			                                                     
/******/ 			    
/******/ 			                                          
/******/ 			     
/******/ 			  function doResolve(fn, self) {
/******/ 			    var done = false;
/******/ 			    try {
/******/ 			      fn(function (value) {
/******/ 			        if (done) return;
/******/ 			        done = true;
/******/ 			        resolve(self, value);
/******/ 			      }, function (reason) {
/******/ 			        if (done) return;
/******/ 			        done = true;
/******/ 			        reject(self, reason);
/******/ 			      });
/******/ 			    } catch (ex) {
/******/ 			      if (done) return;
/******/ 			      done = true;
/******/ 			      reject(self, ex);
/******/ 			    }
/******/ 			  }

/******/ 			  Promise.prototype['catch'] = function (onRejected) {
/******/ 			    return this.then(null, onRejected);
/******/ 			  };

/******/ 			  Promise.prototype.then = function (onFulfilled, onRejected) {
/******/ 			    var prom = new (this.constructor)(noop);

/******/ 			    handle(this, new Handler(onFulfilled, onRejected, prom));
/******/ 			    return prom;
/******/ 			  };

/******/ 			  Promise.all = function (arr) {
/******/ 			    var args = Array.prototype.slice.call(arr);

/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      if (args.length === 0) return resolve([]);
/******/ 			      var remaining = args.length;

/******/ 			      function res(i, val) {
/******/ 			        try {
/******/ 			          if (val && (typeof val === 'object' || typeof val === 'function')) {
/******/ 			            var then = val.then;
/******/ 			            if (typeof then === 'function') {
/******/ 			              then.call(val, function (val) {
/******/ 			                res(i, val);
/******/ 			              }, reject);
/******/ 			              return;
/******/ 			            }
/******/ 			          }
/******/ 			          args[i] = val;
/******/ 			          if (--remaining === 0) {
/******/ 			            resolve(args);
/******/ 			          }
/******/ 			        } catch (ex) {
/******/ 			          reject(ex);
/******/ 			        }
/******/ 			      }

/******/ 			      for (var i = 0; i < args.length; i++) {
/******/ 			        res(i, args[i]);
/******/ 			      }
/******/ 			    });
/******/ 			  };

/******/ 			  Promise.resolve = function (value) {
/******/ 			    if (value && typeof value === 'object' && value.constructor === Promise) {
/******/ 			      return value;
/******/ 			    }

/******/ 			    return new Promise(function (resolve) {
/******/ 			      resolve(value);
/******/ 			    });
/******/ 			  };

/******/ 			  Promise.reject = function (value) {
/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      reject(value);
/******/ 			    });
/******/ 			  };

/******/ 			  Promise.race = function (values) {
/******/ 			    return new Promise(function (resolve, reject) {
/******/ 			      for (var i = 0, len = values.length; i < len; i++) {
/******/ 			        values[i].then(resolve, reject);
/******/ 			      }
/******/ 			    });
/******/ 			  };

/******/ 			                                                        
/******/ 			  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
/******/ 			    function (fn) {
/******/ 			      setTimeoutFunc(fn, 0);
/******/ 			    };

/******/ 			  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
/******/ 			    if (typeof console !== 'undefined' && console) {
/******/ 			      console.warn('Possible Unhandled Promise Rejection:', err);                                  
/******/ 			    }
/******/ 			  };

/******/ 			     
/******/ 			                                                    
/******/ 			                                             
/******/ 			                
/******/ 			     
/******/ 			  Promise._setImmediateFn = function _setImmediateFn(fn) {
/******/ 			    Promise._immediateFn = fn;
/******/ 			  };

/******/ 			     
/******/ 			                                                          
/******/ 			                                                                    
/******/ 			                
/******/ 			     
/******/ 			  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
/******/ 			    Promise._unhandledRejectionFn = fn;
/******/ 			  };
/******/ 			  
/******/ 			  if (typeof module !== 'undefined' && module.exports) {
/******/ 			    module.exports = Promise;
/******/ 			  } else if (!root.Promise) {
/******/ 			    root.Promise = Promise;
/******/ 			  }

/******/ 			})(this);
/******/ 		}

/******/ 		/** ===== Promise Polyfill end ===== **/
/******/ 	}).call(window || global, window || global);
/******/ 	/** ===== Webpack2 Polyfill end ===== **/


/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports) {

	alert('success')


/***/ }
/******/ ]);