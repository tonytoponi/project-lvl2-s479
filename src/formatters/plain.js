import _ from 'lodash';

const typeFomatters = [
  {
    check: value => _.isString(value),
    generate: value => `'${value}'`,
  },
  {
    check: value => _.isObject(value),
    generate: () => '[complex value]',
  },
  {
    check: () => true,
    generate: value => value,
  },
];

const renderNode = (node, path = []) => {
  const {
    status, children, key, oldValue, newValue,
  } = node;
  if (status === 'children') {
    const changedChildren = children.filter(child => child.status !== 'unchanged');
    return `${_.flatten(changedChildren.map(child => renderNode(child, [...path, key]))).join('\n')}`;
  }
  if (status === 'added') {
    const { generate } = typeFomatters.find(({ check }) => check(newValue));
    const formattedValue = generate(newValue);
    return `Property '${[...path, key].join('.')}' was added with value: ${formattedValue}`;
  }
  if (status === 'removed') {
    return `Property '${[...path, key].join('.')}' was removed`;
  }
  if (status === 'updated') {
    const { generate: newValueGenerate } = typeFomatters.find(({ check }) => check(newValue));
    const formattedNewValue = newValueGenerate(newValue);
    const { generate: oldValueGenerate } = typeFomatters.find(({ check }) => check(oldValue));
    const formattedOldValue = oldValueGenerate(oldValue);
    return `Property '${[...path, key].join('.')}' was updated. From ${formattedOldValue} to ${formattedNewValue}`;
  }
  return undefined;
};

const render = (diff) => {
  const changedNodes = diff.filter(({ status }) => status !== 'unchanged');
  const result = `${_.flatten(changedNodes.map(node => renderNode(node))).join('\n')}`;
  return result;
};

export default render;
