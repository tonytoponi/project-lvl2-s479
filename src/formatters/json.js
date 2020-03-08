import _ from 'lodash';

const renderNode = (node) => {
  const renderActionsByStatus = {
    children: ({ key, children }) => {
      const processedChildren = `${_.flatten(children.map((child) => renderNode(child))).join(',')}`;
      const renderedNode = `{"${key}":{"children":[${processedChildren}]}}`;
      return renderedNode;
    },
    added: ({ key, status, newValue }) => JSON.stringify({
      [key]: {
        status,
        newValue,
      },
    }),
    removed: ({ key, status, oldValue }) => JSON.stringify({
      [key]: {
        status,
        oldValue,
      },
    }),
    updated: ({
      key, status, oldValue, newValue,
    }) => JSON.stringify({
      [key]: {
        status,
        oldValue,
        newValue,
      },
    }),
    unchanged: ({ key, status, newValue }) => JSON.stringify({
      [key]: {
        status,
        value: newValue,
      },
    }),
  };
  return renderActionsByStatus[node.status](node);
};

const render = (diff) => {
  const renderedDiff = `{"diff":[${_.flatten(diff.map((node) => renderNode(node))).join(',')}]}`;
  return renderedDiff;
};


export default render;
