export function isObject (value) {
  return value && typeof value === 'object' && value !== null;
}

export function isClass (value) {
  return value && typeof value === 'object' && value.constructor && Object.keys(value).length == 0;
}

export function className (value) {
  if(value instanceof Object && value.constructor){
    var className = value.constructor.name;
    if(className !== 'n') { // hacky pseudo-fix for minified classes
      return className;
    }
  }
  var matches = Object.prototype.toString.call(source).match(/\[\w+ (\w+)\]/);
  return matches
    ? matches[1]
    : matches
}

export function isFunction (value) {
  return typeof value === 'function';
}

export function isValue (value) {
  return value && typeof value !== 'object' && typeof value !== 'undefined' && !isFunction(value);
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