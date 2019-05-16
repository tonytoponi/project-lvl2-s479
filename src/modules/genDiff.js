import { parseJson, parseYaml } from './parsers';

const _ = require('lodash');
const { extname } = require('path');

const filesParsers = [
  {
    check: (arg1, arg2) => extname(arg1) === '.json' && extname(arg2) === '.json',
    parse: parseJson,
  },
  {
    check: (arg1, arg2) => extname(arg1) === '.yaml' && extname(arg2) === '.yaml',
    parse: parseYaml,
  },
];

const getfilesParser = (arg1, arg2) => filesParsers.find(({ check }) => check(arg1, arg2));

const makeline = (obj, key, sign = '') => (sign === '' ? `\n  ${key}: ${obj[key]}` : `\n  ${sign} ${key}: ${obj[key]}`);

const generateLine = (obj1, obj2, key) => {
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

const genDiff = (firstPath, secondPath) => {
  const { parse } = getfilesParser(firstPath, firstPath);
  const [firstFileContent, secondFileContent] = parse(firstPath, secondPath);
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

export default genDiff;
