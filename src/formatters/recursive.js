import _ from 'lodash';

const step = '  ';

const stringlifyLine = (key, value, depth, sign = ' ') => `${step.repeat(depth)}${sign} ${key}: ${value}`;

const stringifyNode = (nodekey, value, depth, sign) => {
  if (!_.isObject(value)) {
    const stringifiedNode = stringlifyLine(nodekey, value, depth + 1, sign);
    return stringifiedNode;
  }
  const keys = Object.keys(value);
  const nodeData = keys.map((key) => stringlifyLine(key, value[key], depth + 3)).join('\n');
  const stringlifiedNodeData = `{\n${nodeData}\n${step.repeat(depth + 2)}}`;
  const stringifiedNode = stringlifyLine(nodekey, stringlifiedNodeData, depth + 1, sign);
  return stringifiedNode;
};

const render = (diff, depth = 0) => {
  const renderNode = (node) => {
    const renderActionsByStatus = {
      children: ({ key, children }) => `${step.repeat(depth + 2)}${key}: ${render(children, depth + 2)}`,
      added: ({ key, newValue }) => stringifyNode(key, newValue, depth, '+'),
      removed: ({ key, oldValue }) => stringifyNode(key, oldValue, depth, '-'),
      unchanged: ({ key, value }) => stringifyNode(key, value, depth, ' '),
      updated: ({ key, oldValue, newValue }) => {
        const oldLine = stringifyNode(key, oldValue, depth, '-');
        const newLine = stringifyNode(key, newValue, depth, '+');
        return [oldLine, newLine];
      },
    };
    return renderActionsByStatus[node.status](node);
  };
  const renderedNodes = _.flatten(diff.map((node) => renderNode(node, 1))).join('\n');
  const renderedDiff = `{\n${renderedNodes}\n${step.repeat(depth)}}`;
  return renderedDiff;
};


export default render;
