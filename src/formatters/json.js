import _ from 'lodash';

const renderNode = (node) => {
  const renderActionsByStatus = {
    children: ({ key, children }) => {
      const processedChildren = _.flatten(children.map((child) => renderNode(child)));
      const renderedNode = ({ [key]: { children: processedChildren } });
      return renderedNode;
    },
    added: ({ key, status, newValue }) => ({ [key]: { status, newValue } }),
    removed: ({ key, status, oldValue }) => ({ [key]: { status, oldValue } }),
    updated: ({
      key, status, oldValue, newValue,
    }) => ({ [key]: { status, oldValue, newValue } }),
    unchanged: ({ key, status, newValue }) => ({ [key]: { status, value: newValue } }),
  };
  return renderActionsByStatus[node.status](node);
};

const render = (diff) => {
  const renderedDiff = JSON.stringify({ diff: _.flatten(diff.map((node) => renderNode(node))) });
  return renderedDiff;
};


export default render;
