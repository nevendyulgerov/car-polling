/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
export const isNull = val => val === null;

/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
export const isArr = val => Array.isArray(val);

/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
export const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);

/**
 * @description Check if value is of type 'number'
 * @param val
 * @returns {boolean}
 */
export const isNum = val => typeof val === 'number' && !isNaN(val);

/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = val => typeof val === 'function';

/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
export const isStr = val => typeof val === 'string';

/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
export const isUndef = val => typeof val === 'undefined';

/**
 * @description Check if value is of type 'boolean'
 * @param val
 * @returns {boolean}
 */
export const isBool = val => typeof val === 'boolean';

/**
 * @description To int
 * @param val
 * @returns {number}
 */
export const toInt = val => parseInt(val, 10);

/**
 * @description Check if object has property
 * @param obj
 * @param prop
 * @returns {boolean}
 */
export const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * @description Check if object has method
 * @param obj
 * @param method
 * @returns {boolean}
 */
export const hasMethod = (obj, method) => hasProp(obj, method) && isFunc(obj[method]);

/**
 * @description Get object keys
 * @param obj
 * @returns {Array}
 */
export const getKeys = obj => Object.keys(obj);

/**
 * @description Check if object has key
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasKey = (obj, key) => getKeys(obj).indexOf(key) > -1;

/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
export const eachKey = (obj, callback) => {
  Object.keys(obj).forEach((key, index) => callback(key, obj[key], index));
};

/**
 * @description Linear iterator for object properties
 * @param obj
 * @param callback
 */
export const eachProp = (obj, callback) => {
  eachKey(obj, (key, prop, index) => callback(prop, key, index));
};

/**
 * @description Titlize
 * @param text
 * @returns {string}
 */
export const titlize = text => `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;


/**
 * @description Parse variable value by type
 * @param val
 * @returns {*}
 */
export const parseToType = val => {
  if (!isStr(val)) {
    return undefined;
  }

  if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  } else if (val === 'null') {
    return null;
  } else if (+val + '' === val) {
    return +val;
  }

  return val;
};

/**
 * @description Extract nexted prop
 * @param obj
 * @param keysText
 * @returns {*}
 */
export const extractNestedProp = (obj, keysText) => {
  const keys = keysText.split('.');
  const keysLength = keys.length - 1;
  let keysIndex = 0;
  let isValidKey = true;
  let targetObj = { ...obj };
  let targetProp;
  let nextTarget;

  if (keys.length > 0) {
    while (isValidKey) {
      nextTarget = targetObj[keys[keysIndex]];

      if (keysIndex === keysLength) {
        targetProp = !isUndef(nextTarget) && !isNull(nextTarget)
          ? nextTarget
          : undefined;
        break;
      }

      if (!isObj(nextTarget)) {
        isValidKey = false;
        break;
      }

      targetObj = nextTarget;
      keysIndex += 1;
    }
  }

  return targetProp;
};

/**
 * @description Debounce
 * @returns {function}
 */
export const debounce = ({ timeout, id }) => {
  const timers = {};

  return callback => {
    if (!id) {
      timers[id] = '0';
    }
    if (timers[id]) {
      clearTimeout(timers[id]);
    }
    timers[id] = setTimeout(callback, timeout);
  };
};

/**
 * @description Sequence
 * @returns {{chain: (function(*=): chain), execute: execute}}
 */
export const sequence = function () {
  const chained = [];
  let value;
  let error;

  const chain = function (func) {
    if (chained) {
      chained.push(func);
    }
    return this;
  };
  const execute = function (index = 0) {
    let callback;
    if (!chained || index >= chained.length) {
      return true;
    }

    callback = chained[index];
    callback({
      resolve(_value) {
        value = _value;
        execute(++index);
      },
      reject(_error) {
        error = _error;
        execute(++index);
      },
      response: {
        value,
        error
      }
    });
  };

  return {
    chain,
    execute
  };
};
