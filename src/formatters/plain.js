import _ from 'lodash';

const stringlify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const render = (diff, parentsKeys = []) => {
  const renderActionsByStatus = {
    children: ({ key, children }) => {
      const renderedChildren = render(children, [...parentsKeys, key]);
      return renderedChildren;
    },
    added: ({ key, newValue }) => {
      const renderedNode = `Property '${[...parentsKeys, key].join('.')}' was added with value: ${stringlify(newValue)}`;
      return renderedNode;
    },
    removed: ({ key }) => {
      const renderedNode = `Property '${[...parentsKeys, key].join('.')}' was removed`;
      return renderedNode;
    },
    updated: ({ key, oldValue, newValue }) => {
      const renderedNode = `Property '${[...parentsKeys, key].join('.')}' was updated. From ${stringlify(oldValue)} to ${stringlify(newValue)}`;
      return renderedNode;
    },
  };

  const renderNode = (node) => renderActionsByStatus[node.status](node);

  const changedNodes = diff.filter(({ status }) => status !== 'unchanged');
  const renderedDiff = `${_.flatten(changedNodes.map(renderNode)).join('\n')}`;
  return renderedDiff;
};

export default render;
