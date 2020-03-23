import { isString, isObject, flatten } from 'lodash';

const stringlify = (value) => {
  if (isString(value)) {
    return `'${value}'`;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const renderActionsByStatus = {
  nested: (propertyPath, { children }, render) => render(children, propertyPath),
  added: (propertyPath, { newValue }) => `Property '${propertyPath.join('.')}' was added with value: ${stringlify(newValue)}`,
  removed: (propertyPath) => `Property '${propertyPath.join('.')}' was removed`,
  updated: (propertyPath, { oldValue, newValue }) => `Property '${propertyPath.join('.')}' was updated. From ${stringlify(oldValue)} to ${stringlify(newValue)}`,
};

const render = (diff, parentsKeys = []) => {
  const renderNode = (node) => {
    const propertyPath = [...parentsKeys, node.key];
    return renderActionsByStatus[node.status](propertyPath, node, render);
  };
  const changedNodes = diff.filter(({ status }) => status !== 'unchanged');
  const renderedDiff = flatten(changedNodes.map(renderNode)).join('\n');
  return renderedDiff;
};

export default render;
