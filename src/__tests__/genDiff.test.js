import genDiff from '../modules/genDiff';

const fs = require('fs');
const path = require('path');

const generateTestData = (path1, path2, resultPath, isRelative = false) => {
  const result = [
    isRelative ? path1 : path.join(__dirname, '__fixtures__', path1),
    isRelative ? path2 : path.join(__dirname, '__fixtures__', path2),
    fs.readFileSync(path.join(__dirname, '__fixtures__', resultPath), 'utf8'),
  ];
  return result;
};

const testdata = [
  generateTestData('/case1/file1.json', '/case1/file2.json', '/case1/result.txt'),
  generateTestData('/case2/file1.json', '/case2/file2.json', '/case2/result.txt'),
  generateTestData('/case4/file1.json', '/case4/file2.json', '/case4/result.txt'),
  generateTestData('/case5/file1.yaml', '/case5/file2.yaml', '/case5/result.txt'),
  generateTestData('/case6/file1.yaml', '/case6/file2.yaml', '/case6/result.txt'),
  generateTestData('/case7/file1.ini', '/case7/file2.ini', '/case7/result.txt'),
  generateTestData(
    './src/__tests__/__fixtures__/case1/file1.json',
    './src/__tests__/__fixtures__/case1/file2.json',
    '/case1/result.txt', true,
  ),
];

test.each(testdata)(
  'Should work with next files(%o, %o)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
