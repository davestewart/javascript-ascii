import {
  isClass,
  isObject,
  isFunction,
  className,
  parseBool,
  isValue,
} from './utils';

function print (name, value, recursive) {

  var val;
  if (recursive) {
    name  = name + ': ' + className(value);
    val   = ' <recursion>';
  }
  else if(typeof value === 'undefined'){
    val   = ': undefined';
  }
  else if (value instanceof Date) {
    val   = ' : ' + String(value);
  }
  else if (Array.isArray(value)) {
    name  = name + ': Array[' +value.length+ ']';
    val   = '';
  }
  else if (isFunction(value)) {
    name  = name + ': ';
    val   = value.toString().match(/^.+\)/).pop();
  }
  else if (isClass(value)) {
    val   = ': ' + className(value);
  }
  else if (isObject(value)) {
    name  = name + ': Object';
    val   = '';
  }
  else if (isValue(value)) {
    val   = ': ' + JSON.stringify(value)
  }
  else
  {
    val   = ': ' + value;
  }

  output += pipes.join('') + ' +- ' + name + val + '\n';

}

function group (keys, parent, type) {
  switch(type){
    case 'func':
    case 'prop':
      var func = [],
          prop = [];
      keys.map(key => {
        parent[key] instanceof Function
          ? func.push(key)
          : prop.push(key);
      });
      return type === 'func'
        ? func.concat(prop)
        : prop.concat(func);
      break;
  }
  return keys;
}


function process (parent, isLast) {

  if (depth < options.depth) {

    depth++;
    objects.push(parent);
    pipes.push(isLast !== false ? '    ' : ' |  ');

    var keys = Object.keys(parent);
    keys = keys.filter( k => k !== 'constructor' )

    if (options.sort) {
      keys.sort();
    }

    if(options.group) {
      keys = group(keys, parent, options.group);
    }

    for (var k = 0; k < keys.length; k++) {

      var key = keys[k];
      var value = parent[key];
      var recursive = !options.recursive && objects.indexOf(value) > -1;

      print(key, value, recursive);
      if (!recursive && isObject(value)) {
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

var options,
  depth,
  output,
  path,
  objects,
  names,
  pipes;

export default function (value, opts, name) {

  depth = 0;
  path = '';
  objects = [];
  names = [];
  pipes = [];

  options = Object.assign(defaults, opts);
  options.depth     = parseInt(options.depth);
  options.recursive = parseBool(options.recursive);
  options.sort      = parseBool(options.sort);
  options.group     = parseBool(options.group);

  output = ' +- ' + (opts.name || name || className(value)) + '\n';

  process(value);

  return output;

}
