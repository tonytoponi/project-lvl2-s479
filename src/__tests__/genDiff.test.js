
import fs from 'fs';
import path from 'path';
import genDiff from '..';


const generateTestData = (path1, path2, resultPath, isRelative = false) => {
  const result = [
    isRelative ? path1 : path.join(__dirname, '__fixtures__', path1),
    isRelative ? path2 : path.join(__dirname, '__fixtures__', path2),
    fs.readFileSync(path.join(__dirname, '__fixtures__', resultPath), 'utf8'),
  ];
  return result;
};

const relativePathFiles = [
  [
    './src/__tests__/__fixtures__/Simple/file1.json',
    './src/__tests__/__fixtures__/Simple/file2.json',
    './Result/simpleDiff.txt', true,
  ],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const emptyFiles = [
  ['/Empty/file1.json', '/Empty/file2.json', '/Result/emptyDiff.txt'],
  ['/Empty/file1.yaml', '/Empty/file2.yaml', '/Result/emptyDiff.txt'],
  ['/Empty/file1.ini', '/Empty/file2.ini', '/Result/emptyDiff.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const SimpleFiles = [
  ['/Simple/file1.json', '/Simple/file2.json', '/Result/simpleDiff.txt'],
  ['/Simple/file1.yaml', '/Simple/file2.yaml', '/Result/simpleDiff.txt'],
  ['/Simple/file1.ini', '/Simple/file2.ini', '/Result/simpleDiff.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const recusiveReportFiles = [
  ['/Complex/file1.json', '/Complex/file2.json', '/Result/recursiveDiff.txt'],
  ['/Complex/file1.yaml', '/Complex/file2.yaml', '/Result/recursiveDiff.txt'],
  ['/Complex/file1.ini', '/Complex/file2.ini', '/Result/recursiveDiff.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const plainReportFiles = [
  ['/Complex/file1.json', '/Complex/file2.json', '/Result/plainDiff.txt'],
  ['/Complex/file1.yaml', '/Complex/file2.yaml', '/Result/plainDiff.txt'],
  ['/Complex/file1.ini', '/Complex/file2.ini', '/Result/plainDiff.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const jsonReportFiles = [
  ['/Complex/file1.json', '/Complex/file2.json', '/Result/jsonDiff.json'],
  ['/Complex/file1.yaml', '/Complex/file2.yaml', '/Result/jsonDiff.json'],
  ['/Complex/file1.ini', '/Complex/file2.ini', '/Result/jsonDiff.json'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

test.each(relativePathFiles)(
  'Should work with relative paths to files(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(emptyFiles)(
  'Should work with empty files(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(SimpleFiles)(
  'Should work with simple files(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(recusiveReportFiles)(
  'Should generate recursive report(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(plainReportFiles)(
  'Should generate plain report(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b, 'plain')).toBe(expected);
  },
);

test.each(jsonReportFiles)(
  'Should generate json report(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b, 'json')).toBe(expected);
  },
);
