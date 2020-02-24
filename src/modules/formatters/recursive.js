import _ from 'lodash';

const stringify = (key, value, depth, sign) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const objectDepth = depth + 3;
    const objectFields = keys.map(k => `${'  '.repeat(objectDepth)}${k}: ${value[k]}`).join('\n');
    const stringifiedObject = `${'  '.repeat(depth)}${sign} ${key}: {\n${objectFields}\n${'  '.repeat(depth + 1)}}`;
    return stringifiedObject;
  }
  return `${'  '.repeat(depth)}${sign} ${key}: ${value}`;
};

const renderNode = (node, depth) => {
  const {
    status, children, key, oldValue, newValue,
  } = node;
  if (status === 'children') {
    return `${'  '.repeat(depth + 1)}${key}: {\n${_.flatten(children.map(child => renderNode(child, depth + 2))).join('\n')}\n${'  '.repeat(depth + 1)}}`;
  }
  if (status === 'unchanged') {
    return stringify(key, newValue, depth, ' ');
  }
  if (status === 'added') {
    return stringify(key, newValue, depth, '+');
  }
  if (status === 'removed') {
    return stringify(key, oldValue, depth, '-');
  }
  if (status === 'updated') {
    return [stringify(key, oldValue, depth, '-'), (stringify(key, newValue, depth, '+'))];
  }
  return undefined;
};

const render = (diff) => {
  const result = `{\n${_.flatten(diff.map(node => renderNode(node, 1))).join('\n')}\n}`;
  return result;
};


export default render;
