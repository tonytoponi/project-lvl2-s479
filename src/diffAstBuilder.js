import _ from 'lodash';

const buildDiffAst = (oldData, newData) => {
  const buildNode = (nodeKey) => {
    const actions = [
      {
        check: ([v1, v2]) => v1 instanceof Object && v2 instanceof Object,
        process: ([key, child1, child2]) => ({
          status: 'children',
          key,
          children: buildDiffAst(child1, child2),
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
    const oldValue = oldData[nodeKey];
    const newValue = newData[nodeKey];
    const { process } = actions.find(({ check }) => check([oldValue, newValue]));
    const node = process([nodeKey, oldValue, newValue]);
    return node;
  };
  const oldDataKeys = Object.keys(oldData);
  const newDataKeys = Object.keys(newData);
  const keysUnion = _.union(oldDataKeys, newDataKeys).sort();
  const diff = keysUnion
    .map((key) => buildNode(key));
  return diff;
};


export default buildDiffAst;
