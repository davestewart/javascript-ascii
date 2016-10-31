(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Ascii", [], factory);
	else if(typeof exports === 'object')
		exports["Ascii"] = factory();
	else
		root["Ascii"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.table = exports.tree = undefined;
	
	var _tree = __webpack_require__(1);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _table = __webpack_require__(4);
	
	var _table2 = _interopRequireDefault(_table);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.tree = _tree2.default;
	exports.table = _table2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value, opts, name) {
	
	  depth = 0;
	  output = '';
	  path = '';
	  objects = [];
	  names = [];
	  pipes = [];
	
	  options = Object.assign(defaults, opts);
	  options.depth = parseInt(options.depth);
	  options.sort = (0, _utils.parseBool)(options.sort);
	  options.group = (0, _utils.parseBool)(options.group);
	
	  output = ' +- ' + (opts.name || name || (0, _utils.className)(value)) + '\n';
	
	  process(value);
	
	  return output;
	};
	
	var _utils = __webpack_require__(3);
	
	function print(name, value, recursive) {
	
	  var val;
	  if (recursive) {
	    name = name + ': ' + (0, _utils.className)(value);
	    val = ' <recursion>';
	  } else if (typeof value === 'undefined') {
	    val = ': undefined';
	  } else if (value instanceof Date) {
	    val = ' : ' + String(value);
	  } else if (Array.isArray(value)) {
	    name = name + ': Array[' + value.length + ']';
	    val = '';
	  } else if ((0, _utils.isFunction)(value)) {
	    name = name + ': ';
	    val = value.toString().match(/^.+\)/).pop();
	  } else if ((0, _utils.isClass)(value)) {
	    val = ': ' + (0, _utils.className)(value);
	  } else if ((0, _utils.isObject)(value)) {
	    name = name + ': Object';
	    val = '';
	  } else if ((0, _utils.isValue)(value)) {
	    val = ': ' + JSON.stringify(value);
	  } else {
	    val = ': ' + value;
	  }
	
	  output += pipes.join('') + ' +- ' + name + val + '\n';
	}
	
	function group(keys, parent, sort) {
	  switch (sort) {
	    case true:
	    case 'true':
	    case 'on':
	      return keys.sort();
	      break;
	    case 'func':
	    case 'prop':
	      var func = [],
	          prop = [];
	      keys.map(function (key) {
	        parent[key] instanceof Function ? func.push(key) : prop.push(key);
	      });
	      return sort === 'func' ? func.concat(prop) : prop.concat(func);
	      break;
	  }
	  return keys;
	}
	
	function process(parent, isLast) {
	
	  if (depth < options.depth) {
	
	    depth++;
	    objects.push(parent);
	    pipes.push(isLast !== false ? '    ' : ' |  ');
	
	    var keys = Object.keys(parent);
	    keys = keys.filter(function (k) {
	      return k !== 'constructor';
	    });
	
	    if (options.sort) {
	      keys = keys.sort();
	    }
	
	    if (options.group) {
	      keys = group(keys, parent, options.group);
	    }
	
	    for (var k = 0; k < keys.length; k++) {
	
	      var key = keys[k];
	      var value = parent[key];
	      var recursive = !options.recursive && objects.indexOf(value) > -1;
	
	      print(key, value, recursive);
	      if (!recursive && (0, _utils.isObject)(value)) {
	        process(value, k === keys.length - 1);
	      }
	    }
	
	    objects.pop();
	    pipes.pop();
	    depth--;
	  }
	}
	
	var defaults = {
	  depth: 5,
	  sort: false,
	  prop: true,
	  func: false
	};
	
	var options, depth, output, path, objects, names, pipes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isObject = isObject;
	exports.isClass = isClass;
	exports.className = className;
	exports.isFunction = isFunction;
	exports.isValue = isValue;
	exports.parseBool = parseBool;
	function isObject(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
	}
	
	function isClass(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor && Object.keys(value).length == 0;
	}
	
	function className(value) {
	  if (value instanceof Object && value.constructor) {
	    return value.constructor.name;
	  }
	  var matches = Object.prototype.toString.call(source).match(/\[\w+ (\w+)\]/);
	  return matches ? matches[1] : matches;
	}
	
	function isFunction(value) {
	  return typeof value === 'function';
	}
	
	function isValue(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && typeof value !== 'undefined' && !isFunction(value);
	}
	
	/**
	 * Returns any boolean-like values as true booleans
	 * @param value
	 * @returns {boolean|*}
	 */
	function parseBool(value) {
	  return typeof value === 'string' ? value === 'true' || value === '1' || value === 'on' ? true : value === 'false' || value === '0' || value === 'off' ? false : value : value;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  return 'table!';
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ascii.js.map