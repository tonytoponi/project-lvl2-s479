import genDiff from '../modules/generateJsonDifference';

const fs = require('fs');
const path = require('path');

const case1Json1Path = path.join(__dirname, 'fixtures/case1/file1.json');
const case1Json2Path = path.join(__dirname, 'fixtures/case1/file2.json');
const case1Result = fs.readFileSync(path.join(__dirname, 'fixtures/case1/result.txt'), 'utf8');
const case2Json1Path = path.join(__dirname, 'fixtures/case2/file1.json');
const case2Json2Path = path.join(__dirname, 'fixtures/case2/file2.json');
const case2Result = fs.readFileSync(path.join(__dirname, 'fixtures/case2/result.txt'), 'utf8');
const case3Json1Path = path.join(__dirname, 'fixtures/case3/file1.json');
const case3Result = fs.readFileSync(path.join(__dirname, 'fixtures/case3/result.txt'), 'utf8');

test('Should generate difference between files', () => {
  expect(genDiff(case1Json1Path, case1Json2Path)).toBe(case1Result);
});
test('Should generate Empty sting', () => {
  expect(genDiff(case2Json1Path, case2Json2Path)).toBe(case2Result);
});
test('Should generate same strings as document', () => {
  expect(genDiff(case3Json1Path, case3Json1Path)).toBe(case3Result);
});
