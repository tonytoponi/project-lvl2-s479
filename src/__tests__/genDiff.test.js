import genDiff from '../modules/genDiff';

const fs = require('fs');
const path = require('path');

const generateTestData = (path1, path2, resultPath, isRelative = false) => {
  const result = {
    json1: isRelative ? path1 : path.join(__dirname, '__fixtures__', path1),
    json2: isRelative ? path2 : path.join(__dirname, '__fixtures__', path2),
    result: fs.readFileSync(path.join(__dirname, '__fixtures__', resultPath), 'utf8'),
  };
  return result;
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
    '/case1/result.txt', true,
  );
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
test('Should work with yaml', () => {
  const testData = generateTestData('/case5/file1.yaml', '/case5/file2.yaml', '/case5/result.txt');
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
test('Should work with empty yaml', () => {
  const testData = generateTestData('/case6/file1.yaml', '/case6/file2.yaml', '/case6/result.txt');
  expect(genDiff(testData.json1, testData.json2)).toBe(testData.result);
});
