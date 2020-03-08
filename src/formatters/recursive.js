import _ from 'lodash';

const step = '  ';

const stringify = (key, value, depth, sign) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const objectDepth = depth + 3;
    const stringifiedObject = keys.map(k => `${step.repeat(objectDepth)}${k}: ${value[k]}`).join('\n');
    return `${step.repeat(depth)}${sign} ${key}: {\n${stringifiedObject}\n${step.repeat(depth + 1)}}`;
  }
  const stringlifiedLine = `${step.repeat(depth)}${sign} ${key}: ${value}`;
  return stringlifiedLine;
};

const renderNode = (node, depth) => {
  const renderActionsByStatus = {
    children: ({ key, children }) => {
      const processedChildren = _.flatten(children.map(child => renderNode(child, depth + 2))).join('\n');
      const renderedNode = `${step.repeat(depth + 1)}${key}: {\n${processedChildren}\n${step.repeat(depth + 1)}}`;
      return renderedNode;
    },
    added: ({ key, newValue }) => {
      const renderedNode = stringify(key, newValue, depth, '+');
      return renderedNode;
    },
    removed: ({ key, oldValue }) => {
      const renderedNode = stringify(key, oldValue, depth, '-');
      return renderedNode;
    },
    updated: ({ key, oldValue, newValue }) => {
      const oldLine = stringify(key, oldValue, depth, '-');
      const newLine = stringify(key, newValue, depth, '+');
      const renderedNode = [oldLine, newLine];
      return renderedNode;
    },
    unchanged: ({ key, newValue }) => {
      const renderedNode = stringify(key, newValue, depth, ' ');
      return renderedNode;
    },
  };
  return renderActionsByStatus[node.status](node);
};

const render = (diff) => {
  const renderedDiff = `{\n${_.flatten(diff.map(node => renderNode(node, 1))).join('\n')}\n}`;
  return renderedDiff;
};


export default render;
