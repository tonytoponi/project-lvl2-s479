import _ from 'lodash';

const buildActions = [
  {
    check: ({ oldValue, newValue }) => _.isObject(oldValue) && _.isObject(newValue),
    build: ({
      key, oldValue, newValue, buildDiffAst,
    }) => ({
      key, status: 'children', children: buildDiffAst(oldValue, newValue),
    }),
  },
  {
    check: ({ oldValue, newValue }) => _.isEqual(oldValue, newValue),
    build: ({ key, newValue }) => ({ key, status: 'unchanged', value: newValue }),
  },
  {
    check: ({ oldValue }) => _.isUndefined(oldValue),
    build: ({ key, newValue }) => ({ key, status: 'added', newValue }),
  },
  {
    check: ({ newValue }) => _.isUndefined(newValue),
    build: ({ key, oldValue }) => ({ key, status: 'removed', oldValue }),
  },
  {
    check: ({ oldValue, newValue }) => !_.isEqual(oldValue, newValue),
    build: ({ key, oldValue, newValue }) => ({
      key, status: 'updated', oldValue, newValue,
    }),
  },
];

const buildNode = (key, oldValue, newValue, buildDiffAst) => {
  const { build } = buildActions.find(({ check }) => check({ oldValue, newValue }));
  const node = build({
    key, oldValue, newValue, buildDiffAst,
  });
  return node;
};

const buildDiffAst = (oldData, newData) => {
  const oldDataKeys = Object.keys(oldData);
  const newDataKeys = Object.keys(newData);
  const keysUnion = _.union(oldDataKeys, newDataKeys).sort();
  const buildNodeByKey = (key) => buildNode(key, oldData[key], newData[key], buildDiffAst);
  const diffAst = keysUnion.map(buildNodeByKey);
  return diffAst;
};


export default buildDiffAst;
