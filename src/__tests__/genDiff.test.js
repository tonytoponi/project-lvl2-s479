import genDiff from '../modules/genDiff';

const fs = require('fs');
const path = require('path');

test('Should generate difference string between files', () => {
  const json1Path = path.join(__dirname, '__fixtures__/case1/file1.json');
  const json2Path = path.join(__dirname, '__fixtures__/case1/file2.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/case1/result.txt'), 'utf8');
  expect(genDiff(json1Path, json2Path)).toBe(result);
});
test('Should work with empty JSONs', () => {
  const json1Path = path.join(__dirname, '__fixtures__/case2/file1.json');
  const json2Path = path.join(__dirname, '__fixtures__/case2/file2.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/case2/result.txt'), 'utf8');
  expect(genDiff(json1Path, json2Path)).toBe(result);
});
test('Should generate same difference as document', () => {
  const json1Path = path.join(__dirname, '__fixtures__/case3/file1.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/case3/result.txt'), 'utf8');
  expect(genDiff(json1Path, json1Path)).toBe(result);
});
test('Should generate difference as second document', () => {
  const json1Path = path.join(__dirname, '__fixtures__/case4/file1.json');
  const json2Path = path.join(__dirname, '__fixtures__/case4/file2.json');
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/case4/result.txt'), 'utf8');
  expect(genDiff(json1Path, json2Path)).toBe(result);
});
test('Should work with relative path', () => {
  const json1Path = './src/__tests__/__fixtures__/case1/file1.json';
  const json2Path = './src/__tests__/__fixtures__/case1/file2.json';
  const result = fs.readFileSync(path.join(__dirname, '__fixtures__/case1/result.txt'), 'utf8');
  expect(genDiff(json1Path, json2Path)).toBe(result);
});
