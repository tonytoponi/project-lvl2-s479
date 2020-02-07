import getParser from './modules/parsers';
import renderLine from './modules/renderer';

const _ = require('lodash');

const genDiff = (firstPath, secondPath) => {
  const parse = getParser(firstPath, firstPath);
  const [firstFileContent, secondFileContent] = parse(firstPath, secondPath);
  const firstFileContentKeys = Object.keys(firstFileContent);
  const secondFileContentKeys = Object.keys(secondFileContent);
  const addedKeys = _.difference(secondFileContentKeys, firstFileContentKeys);
  const contentKeys = [...firstFileContentKeys, ...addedKeys];
  const uniqContentKeys = _.uniq(contentKeys);
  const result = uniqContentKeys.reduce(
    (acc, key) => [...acc, renderLine(firstFileContent, secondFileContent, key)], [],
  );
  return `{${result.join('')}\n}`;
};

export default genDiff;
