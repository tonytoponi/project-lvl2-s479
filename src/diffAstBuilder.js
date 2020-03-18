import _ from 'lodash';

const statuses = [
  {
    check: ([v1, v2]) => v1 instanceof Object && v2 instanceof Object,
    status: 'children',
  },
  {
    check: ([v1, v2]) => Object.is(v1, v2),
    status: 'unchanged',
  },
  {
    check: ([v1]) => typeof v1 === 'undefined',
    status: 'added',
  },
  {
    check: ([, v2]) => typeof v2 === 'undefined',
    status: 'removed',
  },
  {
    check: ([v1, v2]) => !Object.is(v1, v2),
    status: 'updated',
  },
];

const buildDiffAst = (oldData, newData) => {
  const buildNode = (key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];
    const { status } = statuses.find(({ check }) => check([oldValue, newValue]));
    if (status === 'children') {
      const node = {
        status,
        key,
        children: buildDiffAst(oldValue, newValue),
      };
      return node;
    }
    const node = {
      status, key, oldValue, newValue,
    };
    return node;
  };
  const oldDataKeys = Object.keys(oldData);
  const newDataKeys = Object.keys(newData);
  const keysUnion = _.union(oldDataKeys, newDataKeys).sort();
  const diff = keysUnion.map(buildNode);
  return diff;
};


export default buildDiffAst;
