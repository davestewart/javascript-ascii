function isFunction (value) { return value && typeof value === 'function'; }
function isValue (value) { return value && typeof value !== 'object' && typeof value !== 'undefined' && !isFunction(value); }
function isObject (value) { return value && typeof value === 'object' && value !== null; }
function isClass (value) { return value && typeof value === 'object' && value.constructor && Object.keys(value).length == 0; }
function className (value) {
  return Array.isArray(value)
    ? '[object Array]'
    : Object.prototype.toString.call(source)
}

function print (name, value, recursion) {

  var val;
  if (recursion) {
    val = ' : <recursion>';
  }
  else if(typeof value === 'undefined'){
    val = ' : undefined';
  }
  else if (Array.isArray(value)) {
    val = ' : ' + (depth < options.depth ? '' : '<array>');
  }
  else if (isFunction(value)) {
    name = name + ' ()';
    val = '';
  }
  else if (isClass(value)) {
    val = ' : ' + String(value);
  }
  else if (isObject(value)) {
    val = depth < options.depth
      ? ''
      : '<object>';
    val = ' : ' + val;
  }
  else if (isValue(value)) {
    val = ' : ' + JSON.stringify(value)
  }
  else
  {
    val = ' : ' + value;
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
      var recursion = !options.recursion && objects.indexOf(value) > -1;

      print(key, value, recursion);
      if (!recursion && isObject(value)) {
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
