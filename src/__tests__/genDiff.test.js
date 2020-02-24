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

const relativePathFiles = [
  [
    './src/__tests__/__fixtures__/Simple/file1.json',
    './src/__tests__/__fixtures__/Simple/file2.json',
    './Simple/result.txt', true,
  ],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const emptyFiles = [
  ['/Empty/file1.json', '/Empty/file2.json', '/Empty/result.txt'],
  ['/Empty/file1.yaml', '/Empty/file2.yaml', '/Empty/result.txt'],
  ['/Empty/file1.ini', '/Empty/file2.ini', '/Empty/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const SimpleFiles = [
  ['/Simple/file1.json', '/Simple/file2.json', '/Simple/result.txt'],
  ['/Simple/file1.yaml', '/Simple/file2.yaml', '/Simple/result.txt'],
  ['/Simple/file1.ini', '/Simple/file2.ini', '/Simple/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const recusiveFiles = [
  ['/Recursive/file1.json', '/Recursive/file2.json', '/Recursive/result.txt'],
  ['/Recursive/file1.yaml', '/Recursive/file2.yaml', '/Recursive/result.txt'],
  ['/Recursive/file1.ini', '/Recursive/file2.ini', '/Recursive/result.txt'],
].reduce((acc, paths) => [...acc, generateTestData(...paths)], []);

const plainFiles = [
  ['/Plain/file1.json', '/Plain/file2.json', '/Plain/result.txt'],
  ['/Plain/file1.yaml', '/Plain/file2.yaml', '/Plain/result.txt'],
  ['/Plain/file1.ini', '/Plain/file2.ini', '/Plain/result.txt'],
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

test.each(recusiveFiles)(
  'Should generate recursive report(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);

test.each(plainFiles)(
  'Should generate plain report(%p, %p)',
  (a, b, expected) => {
    expect(genDiff(a, b, 'plain')).toBe(expected);
  },
);
