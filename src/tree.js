import {
  isClass,
  isObject,
  isFunction,
  isValue,
} from './utils';

function print (name, value, recursive) {

  var val;
  if (recursive) {
    name  = name + ': Object';
    val   = ' <recursion>';
  }
  else if(typeof value === 'undefined'){
    val   = ': undefined';
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
    val   = ': ' + String(value);
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

function process (parent, isLast) {

  if (depth < options.depth) {

    depth++;
    objects.push(parent);
    pipes.push(isLast !== false ? '    ' : ' |  ');

    var keys = Object.keys(parent);
    if (options.sort) {
      keys.sort();
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
  output = '';
  path = '';
  objects = [];
  names = [];
  pipes = [];

  options = Object.assign(defaults, opts);
  options.depth = parseInt(options.depth);

  output = ' +- ' + (opts.name || name || String(value)) + '\n';

  process(value);

  return output;

}
