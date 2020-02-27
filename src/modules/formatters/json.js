import _ from 'lodash';


const renderNode = (node) => {
  const {
    status, children, key, oldValue, newValue,
  } = node;
  if (status === 'children') {
    const processedChildren = `${_.flatten(children.map(child => renderNode(child))).join(',')}`;
    return `{"${key}":{"children":[${processedChildren}]}}`;
  }
  if (status === 'unchanged') {
    return JSON.stringify({
      [key]: {
        status,
        value: newValue,
      },
    });
  }
  if (status === 'added') {
    return JSON.stringify({
      [key]: {
        status,
        newValue,
      },
    });
  }
  if (status === 'removed') {
    return JSON.stringify({
      [key]: {
        status,
        oldValue,
      },
    });
  }
  if (status === 'updated') {
    return JSON.stringify({
      [key]: {
        status,
        oldValue,
        newValue,
      },
    });
  }
  return undefined;
};

const render = (diff) => {
  const result = `{"diff":[${_.flatten(diff.map(node => renderNode(node))).join(',')}]}`;
  return result;
};


export default render;
