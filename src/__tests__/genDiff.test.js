import genDiff from '../modules/genDiff';

const fs = require('fs');
const path = require('path');

const generateTestData = (path1, path2, resultPath, type = 'abs') => {
  const paths = {};
  if (type === 'abs') {
    paths.json1 = path.join(__dirname, '__fixtures__', path1);
    paths.json2 = path.join(__dirname, '__fixtures__', path2);
  } else {
    paths.json1 = path1;
    paths.json2 = path2;
  }
  paths.result = fs.readFileSync(path.join(__dirname, '__fixtures__', resultPath), 'utf8');
  return paths;
};

test('Should generate difference string between files', () => {
  const testData = generateTestData('/case1/file1.json', '/case1/file2.json', '/case1/result.txt');
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
test('Should work with empty JSONs', () => {
  const testData = generateTestData('/case2/file1.json', '/case2/file2.json', '/case2/result.txt');
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
test('Should generate same difference as document', () => {
  const testData = generateTestData('/case3/file1.json', '', '/case3/result.txt');
  expect(genDiff(testData.json1, testData.json1)).toBe(testData.result);
});
test('Should generate difference as second document', () => {
  const testData = generateTestData('/case4/file1.json', '/case4/file2.json', '/case4/result.txt');
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
test('Should work with relative path', () => {
  const testData = generateTestData(
    './src/__tests__/__fixtures__/case1/file1.json',
    './src/__tests__/__fixtures__/case1/file2.json',
    '/case1/result.txt', 'relative',
  );
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
