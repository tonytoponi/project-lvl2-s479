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
  const renderActionsByStatus = {
    children: ({ key, children }) => {
      const changedChildren = children.filter(child => child.status !== 'unchanged');
      const renderedNode = `${_.flatten(changedChildren.map(child => renderNode(child, [...path, key]))).join('\n')}`;
      return renderedNode;
    },
    added: ({ key, newValue }) => {
      const { generate } = typeFomatters.find(({ check }) => check(newValue));
      const formattedValue = generate(newValue);
      const renderedNode = `Property '${[...path, key].join('.')}' was added with value: ${formattedValue}`;
      return renderedNode;
    },
    removed: ({ key }) => {
      const renderedNode = `Property '${[...path, key].join('.')}' was removed`;
      return renderedNode;
    },
    updated: ({ key, oldValue, newValue }) => {
      const { generate: generateNewValue } = typeFomatters.find(({ check }) => check(newValue));
      const formattedNewValue = generateNewValue(newValue);
      const { generate: generateOldValue } = typeFomatters.find(({ check }) => check(oldValue));
      const formattedOldValue = generateOldValue(oldValue);
      const renderedNode = `Property '${[...path, key].join('.')}' was updated. From ${formattedOldValue} to ${formattedNewValue}`;
      return renderedNode;
    },
  };
  return renderActionsByStatus[node.status](node);
};

const render = (diff) => {
  const changedNodes = diff.filter(({ status }) => status !== 'unchanged');
  const renderedDiff = `${_.flatten(changedNodes.map(node => renderNode(node))).join('\n')}`;
  return renderedDiff;
};

export default render;
