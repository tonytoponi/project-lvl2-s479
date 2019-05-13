const fs = require('fs');
const _ = require('lodash');

const generateLine = (obj1, obj2, key) => {
  if (_.has(obj1, key)) {
    if (_.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return `\n  ${key}: ${obj1[key]}`;
      }
      return `\n  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
    }
    return `\n  - ${key}: ${obj1[key]}`;
  }
  return `\n  + ${key}: ${obj2[key]}`;
};

const getJsonDifference = (firstPath, secondPath) => {
  const firstFileContent = JSON.parse(fs.readFileSync(firstPath, 'utf8'));
  const secondFileContent = JSON.parse(fs.readFileSync(secondPath, 'utf8'));
  const firstFileContentKeys = Object.keys(firstFileContent);
  const secondFileContentKeys = Object.keys(secondFileContent);
  const addedKeys = _.difference(secondFileContentKeys, firstFileContentKeys);
  const contentKeys = [...firstFileContentKeys, ...addedKeys];
  const uniqContentKeys = _.uniq(contentKeys);
  const result = uniqContentKeys.reduce(
    (acc, key) => [...acc, generateLine(firstFileContent, secondFileContent, key)], [],
  );
  return `{${result.join('')}\n}`;
};

export default getJsonDifference;
