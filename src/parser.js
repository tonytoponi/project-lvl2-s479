import yaml from 'js-yaml';
import ini from 'ini';


const fileParsers = [
  {
    check: fileType => fileType === '.json',
    parse: JSON.parse,
  },
  {
    check: fileType => fileType === '.yaml',
    parse: yaml.safeLoad,
  },
  {
    check: fileType => fileType === '.ini',
    parse: ini.parse,
  },
];

const selectParser = fileType => fileParsers.find(({ check }) => check(fileType));

const parse = (fileData, fileType) => {
  const parser = selectParser(fileType);
  const parsedData = parser.parse(fileData);
  return parsedData;
};

export default parse;
