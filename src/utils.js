export function isObject (value) {
  return value && typeof value === 'object' && value !== null;
}

export function isClass (value) {
  return value && typeof value === 'object' && value.constructor && Object.keys(value).length == 0;
}

export function isFunction (value) {
  return typeof value === 'function';
}

export function isValue (value) {
  return value && typeof value !== 'object' && typeof value !== 'undefined' && !isFunction(value);
}

export function className (value, classes) {

  // lookup
  if(classes) {
    for(var name in classes) {
      if(value instanceof classes[name]) {
        return name;
      }
    }
  }

  // try to grab real class name, unless minified
  if(value instanceof Object && value.constructor){
    var className = value.constructor.name;
    if(className !== 'n') {
      return className;
    }
  }

  // attempt to lookup name from toString
  var matches = Object.prototype.toString.call(source).match(/\[\w+ (\w+)\]/);
  return matches
    ? matches[1]
    : matches
}

/**
 * Returns any boolean-like values as true booleans
 * @param value
 * @returns {boolean|*}
 */
export function parseBool (value) {
  return typeof value === 'string'
    ? value === 'true' || value === '1' || value === 'on'
      ? true
      : value === 'false' || value === '0' || value === 'off'
        ? false
        : value
    : value;
}