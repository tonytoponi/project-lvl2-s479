import genDiff from '..';

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

const RelativePathFiles = [
  [
    './src/__tests__/__fixtures__/Plain/file1.json',
    './src/__tests__/__fixtures__/Plain/file2.json',
    './Plain/result.txt', true,
  ],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const emptyFiles = [
  ['/Empty/file1.json', '/Empty/file2.json', '/Empty/result.txt'],
  ['/Empty/file1.yaml', '/Empty/file2.yaml', '/Empty/result.txt'],
  ['/Empty/file1.ini', '/Empty/file2.ini', '/Empty/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const plainFiles = [
  ['/Plain/file1.json', '/Plain/file2.json', 'Plain/result.txt'],
  ['/Plain/file1.yaml', '/Plain/file2.yaml', '/Plain/result.txt'],
  ['/Plain/file1.ini', '/Plain/file2.ini', '/Plain/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const recusiveFiles = [
  ['/Recursive/file1.json', '/Recursive/file2.json', '/Recursive/result.txt'],
  ['/Recursive/file1.yaml', '/Recursive/file2.yaml', '/Recursive/result.txt'],
  ['/Recursive/file1.ini', '/Recursive/file2.ini', '/Recursive/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

test.each(RelativePathFiles)(
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

test.each(plainFiles)(
  'Should work with plain files(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(recusiveFiles)(
  'Should work with recusive files(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
