const yaml = require('js-yaml');
const ini = require('ini');
const fs = require('fs');
const { resolve, extname } = require('path');

const parseJson = (...paths) => paths.map(p => JSON.parse(fs.readFileSync(resolve(p), 'utf8')));

const parseYaml = (...paths) => paths.map(p => yaml.safeLoad(fs.readFileSync(resolve(p), 'utf8')));

const parseIni = (...paths) => paths.map(p => ini.parse(fs.readFileSync(resolve(p), 'utf8')));

const filesParsers = [
  {
    check: (file1, file2) => extname(file1) === '.json' && extname(file2) === '.json',
    parse: parseJson,
  },
  {
    check: (file1, file2) => extname(file1) === '.yaml' && extname(file2) === '.yaml',
    parse: parseYaml,
  },
  {
    check: (file1, file2) => extname(file1) === '.ini' && extname(file2) === '.ini',
    parse: parseIni,
  },
];

const getParser = (file1, file2) => filesParsers.find(({ check }) => check(file1, file2)).parse;

export default getParser;
