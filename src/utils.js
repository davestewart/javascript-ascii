export function isObject (value) {
  return value && typeof value === 'object' && value !== null;
}

export function isClass (value) {
  return value && typeof value === 'object' && value.constructor && Object.keys(value).length == 0;
}

export function className (value) {
  return Array.isArray(value)
    ? '[object Array]'
    : Object.prototype.toString.call(source)
}

export function isFunction (value) {
  return value && typeof value === 'function';
}

export function isValue (value) {
  return value && typeof value !== 'object' && typeof value !== 'undefined' && !isFunction(value);
}

