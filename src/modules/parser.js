import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import { resolve, extname } from 'path';

const filesParsers = [
  {
    check: (file1, file2) => extname(file1) === '.json' && extname(file2) === '.json',
    parse: (...paths) => paths.map(p => JSON.parse(fs.readFileSync(resolve(p), 'utf8'))),
  },
  {
    check: (file1, file2) => extname(file1) === '.yaml' && extname(file2) === '.yaml',
    parse: (...paths) => paths.map(p => yaml.safeLoad(fs.readFileSync(resolve(p), 'utf8'))),
  },
  {
    check: (file1, file2) => extname(file1) === '.ini' && extname(file2) === '.ini',
    parse: (...paths) => paths.map(p => ini.parse(fs.readFileSync(resolve(p), 'utf8'))),
  },
];

const selectParser = (file1, file2) => filesParsers.find(({ check }) => check(file1, file2)).parse;

const parse = (firstPath, secondPath) => selectParser(firstPath, secondPath)(firstPath, secondPath);

export default parse;
