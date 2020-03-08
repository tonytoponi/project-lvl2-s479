import yaml from 'js-yaml';
import ini from 'ini';


const Parsers = [
  {
    check: type => type === '.json',
    parse: JSON.parse,
  },
  {
    check: type => type === '.yaml',
    parse: yaml.safeLoad,
  },
  {
    check: type => type === '.ini',
    parse: ini.parse,
  },
];

const selectParser = type => Parsers.find(({ check }) => check(type));

const parse = (data, type) => {
  const parser = selectParser(type);
  const parsedData = parser.parse(data);
  return parsedData;
};

export default parse;
