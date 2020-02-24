import _ from 'lodash';

const actions = [
  {
    check: ([v1, v2]) => v1 instanceof Object && v2 instanceof Object,
    process: ([key, child1, child2]) => ({
      status: 'children',
      key,
      children: [child1, child2],
    }),
  },
  {
    check: ([v1, v2]) => Object.is(v1, v2),
    process: ([key, , newValue]) => ({
      status: 'unchanged',
      key,
      newValue,
    }),
  },
  {
    check: ([v1]) => typeof v1 === 'undefined',
    process: ([key, , newValue]) => ({
      status: 'added',
      key,
      newValue,
    }),
  },
  {
    check: ([, v2]) => typeof v2 === 'undefined',
    process: ([key, oldValue]) => ({
      status: 'removed',
      key,
      oldValue,
    }),
  },
  {
    check: ([v1, v2]) => !Object.is(v1, v2),
    process: ([key, oldValue, newValue]) => ({
      status: 'updated',
      key,
      oldValue,
      newValue,
    }),
  },
];

const buildNode = (oldFile, newFile, key) => {
  const oldValue = oldFile[key];
  const newValue = newFile[key];
  const { process } = actions.find(({ check }) => check([oldValue, newValue]));
  const node = process([key, oldValue, newValue]);
  return node;
};

const build = (oldFile, newFile) => {
  const buildChilden = (node) => {
    const { status, key, children } = node;
    return status === 'children' ? ({ key, status, children: build(...children) }) : node;
  };

  const oldFileKeys = Object.keys(oldFile);
  const newFileKeys = Object.keys(newFile);
  const uniqKeys = _.uniq([...oldFileKeys, ...newFileKeys]);
  uniqKeys.sort();
  const diff = uniqKeys
    .reduce((acc, key) => [...acc, buildNode(oldFile, newFile, key)], [])
    .map(buildChilden);
  return diff;
};


export default build;
