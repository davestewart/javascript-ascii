var depth;
var maxDepth;
var str;
var path;
var names;
var pipes;

function isFunction(value) {
  return typeof value === 'function';
}
function isValue(value) {
  return typeof value !== 'object' && !isFunction(value);
}
function isObject(value) {
  return typeof value === 'object' && value !== null && typeof value !== 'undefined';
}

function print(name, value) {
  name = name + (isFunction(value) ? '()' : '');
  value = isValue(value) ? ' : ' + JSON.stringify(value) : '';
  str += pipes.join('') + ' +- ' + name + value + '\n';
}

function process(parent, isLast) {
  if (depth < maxDepth) {
    depth++;
    var keys = Object.keys(parent);
    keys.sort();
    pipes.push(isLast !== false ? '    ' : ' |  ');
    for (var k = 0; k < keys.length; k++) {
      var key = keys[k];
      var value = parent[key];
      print(key, value);
      if (isObject(value)) {
        process(value, k === keys.length - 1);
      }
    }
    pipes.pop();
    depth--;
  }
}

export default function (value, name) {

  depth = 0;
  maxDepth = 5;
  str = '';
  path = '';
  names = [];
  pipes = [];

  print(name || String(value), value);
  depth++;
  process(value);
  return str;
}
