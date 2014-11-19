/**
 * (c) 2012-2014 Major League Soccer
 * MIT Licensed
 * For all details and documentation:
 * https://github.com/majorleaguesoccer/dif.js
 */

;(function() {
'use strict';

/*!
 * Module dependencies.
 */

var toString = Object.prototype.toString

/**
 * Get all defaults
 *
 * @param {Object} options hash
 * @api private
 */

function defaults(options) {
  var opt = {
    preserve: true // Preserve nested objects
  , depth: 1       // Preservation branch depth
  , removed: false // Consider missing props removed
  , sort: false    // Sort arrays before comparison
  }
  options = options || {}
  for (var prop in options) {
    opt[prop] = options[prop]
  }
  return opt
}

/**
 * Determine if an object is empty
 *
 * @param {Object} target
 * @returns {Boolean} empty
 * @api private
 */

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }
  return true
}

/**
 * Determine if value is an object
 *
 * @param {Any} test value
 * @returns {Boolean} result
 */

function isObject(val) {
  return toString.call(val) === '[object Object]'
}

/**
 * Determine if two values are equal
 *
 * @param {Any} compare
 * @param {Any} compare
 * @returns {Boolean} result
 * @api private
 */

function isEqual(a, b, options) {
  var type = toString.call(a)
  if (type !== toString.call(b)) {
    return false
  } else if (type === '[object Number]') {
    return a !== +a 
      ? b !== +b 
      : (a === 0 ? 1 / a === 1 / b : a === +b)
  } else if (type === '[object Array]') {
    // Simple array compare
    var size = a.length
    if (size !== b.length) {
      return false
    }
    if (options.sort) {
      a = a.slice(0).sort()
      b = b.slice(0).sort()
    }
    while (size--) {
      if (!isEqual(a[size], b[size], options)) {
        return false
      }
    }
    return true
  } else if (type === '[object Date]' || type === '[object Boolean]') {
    // Check primative values
    return +a === +b
  } else if (type === '[object RegExp]') {
    // Check source patterns and flags
    return a.source == b.source
      && a.global == b.global
      && a.multiline == b.multiline
      && a.ignoreCase == b.ignoreCase
  } else if (type === '[object Object]') {
    // Ensure same property count
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false
    }
    // Test each property
    for (var prop in a) {
      if (!a.hasOwnProperty(prop)) continue
      if (!b.hasOwnProperty(prop)) return false
      if (!isEqual(a[prop], b[prop], options)) return false
    }
    return true
  }
  return a === b
}

/**
 * Find the difference between two objects
 *
 * @param {Object} original object
 * @param {Object} objects to compare
 * @param {Object} options hash (optional)
 * @returns {Object} diff results
 */

function dif(old, source, options, depth) {
  var resp = {}, tmp, preserve
  // Options with defaults
  options = defaults(options)
  // Branching depth
  depth = depth || 1
  preserve = options.preserve && depth >= options.depth
  // Ensure valid arguments
  if (!isObject(old) || !isObject(source) || !isObject(options)) {
    throw new TypeError('Dif arguments must be objects')
  }
  // Iterate through all properties
  for (var prop in source) {
    var val = old[prop]
      , cmp = source[prop]
      , equal = false

    // Ensure valid property
    if (!source.hasOwnProperty(prop)) continue
    // Check if property exists for both objects
    if (!old.hasOwnProperty(prop)) {
      resp[prop] = cmp
      continue
    }
    // Find value equality, if equal continue on
    equal = isEqual(val, cmp, options)
    if (equal) continue
    
    // Nested objects, resurse through the object if we do not wish to 
    // preserve structure, or if we do and have reached the target depth
    if (!preserve && isObject(val) && isObject(cmp)) {
      tmp = dif(val, cmp, options, depth + 1)
      // Ignore empty results
      isEmpty(tmp) || (resp[prop] = tmp)
    } else if (!equal) {
      // Value diff, add to results
      resp[prop] = cmp
    }
  }
  // Find missing properties
  for (var prop in old) {
    if (!old.hasOwnProperty(prop)) continue
    if (!source.hasOwnProperty(prop) && !resp.hasOwnProperty(prop)) {
      resp[prop] = options.removed ? undefined : old[prop]
    }
  }
  return resp
}

/**
 * Current library version, should match `package.json`
 */

dif.VERSION = '0.0.6'

/*!
 * Module exports.
 */

if (typeof exports !== 'undefined') {
  module.exports = dif
} else {
  this.dif = dif
}

}).call(this);