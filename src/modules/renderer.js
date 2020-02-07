const _ = require('lodash');

const makeline = (obj, key, sign = '') => (sign === '' ? `\n  ${key}: ${obj[key]}` : `\n  ${sign} ${key}: ${obj[key]}`);

const renderLine = (obj1, obj2, key) => {
  if (_.has(obj1, key)) {
    if (_.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return makeline(obj1, key);
      }
      return `${makeline(obj2, key, '+')}${makeline(obj1, key, '-')}`;
    }
    return makeline(obj1, key, '-');
  }
  return makeline(obj2, key, '+');
};

export default renderLine;
