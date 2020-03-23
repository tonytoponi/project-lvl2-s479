import {
  isObject, isUndefined, isEqual, union,
} from 'lodash';

const buildActions = [
  {
    check: ({ oldValue, newValue }) => isObject(oldValue) && isObject(newValue),
    build: ({ oldValue, newValue, buildDiffAst }) => ({
      status: 'nested', children: buildDiffAst(oldValue, newValue),
    }),
  },
  {
    check: ({ oldValue, newValue }) => isEqual(oldValue, newValue),
    build: ({ newValue }) => ({ status: 'unchanged', value: newValue }),
  },
  {
    check: ({ oldValue }) => isUndefined(oldValue),
    build: ({ newValue }) => ({ status: 'added', newValue }),
  },
  {
    check: ({ newValue }) => isUndefined(newValue),
    build: ({ oldValue }) => ({ status: 'removed', oldValue }),
  },
  {
    check: ({ oldValue, newValue }) => !isEqual(oldValue, newValue),
    build: ({ oldValue, newValue }) => ({
      status: 'updated', oldValue, newValue,
    }),
  },
];

const buildNode = (key, oldValue, newValue, buildDiffAst) => {
  const { build } = buildActions.find(({ check }) => check({ oldValue, newValue }));
  const nodeData = build({
    key, oldValue, newValue, buildDiffAst,
  });
  const node = { key, ...nodeData };
  return node;
};

const buildDiffAst = (oldData, newData) => {
  const oldDataKeys = Object.keys(oldData);
  const newDataKeys = Object.keys(newData);
  const keysUnion = union(oldDataKeys, newDataKeys).sort();
  const buildNodeByKey = (key) => buildNode(key, oldData[key], newData[key], buildDiffAst);
  const diffAst = keysUnion.map(buildNodeByKey);
  return diffAst;
};


export default buildDiffAst;
