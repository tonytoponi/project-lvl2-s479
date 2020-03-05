import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename);
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Gendiff test', () => {
  const testData = [
    ['json', 'recursive', 'result.recursive.txt'],
    ['yaml', 'plain', 'result.plain.txt'],
    ['ini', 'json', 'result.json'],
  ];

  test.each(testData)(
    'Should work with different filetypes and generate report according "format" key (type: %p, format key: %p)',
    (type, format, e) => {
      const before = getFixturePath(`before.${type}`);
      const after = getFixturePath(`after.${type}`);
      const expected = readFile(e);
      expect(genDiff(before, after, format)).toBe(expected);
    },
  );
  test('Should generate recursive report if "format" key not specified', () => {
    const before = getFixturePath('before.json');
    const after = getFixturePath('after.json');
    const expected = readFile('result.recursive.txt');
    expect(genDiff(before, after)).toBe(expected);
  });
});
