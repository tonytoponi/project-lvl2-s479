import _ from 'lodash';

const step = '  ';

const stringify = (key, value, depth, sign) => {
  if (!_.isObject(value)) {
    const stringlifiedLine = `${step.repeat(depth + 1)}${sign} ${key}: ${value}`;
    return stringlifiedLine;
  }
  const keys = Object.keys(value);
  const objectDepth = depth + 4;
  const stringifiedObject = keys.map((k) => `${step.repeat(objectDepth)}${k}: ${value[k]}`).join('\n');
  return `${step.repeat(depth + 1)}${sign} ${key}: {\n${stringifiedObject}\n${step.repeat(depth + 2)}}`;
};

const render = (diff, diffKey = '', depth = 0) => {
  const renderNode = (node) => {
    const renderActionsByStatus = {
      children: ({ key, children }) => {
        const renderedChildren = render(children, `${key}: `, depth + 2);
        return renderedChildren;
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
  const renderedDiff = `${step.repeat(depth)}${diffKey}{\n${_.flatten(diff.map((node) => renderNode(node, 1))).join('\n')}\n${step.repeat(depth)}}`;
  return renderedDiff;
};


export default render;
