import yaml from 'js-yaml';
import ini from 'ini';

const parsersByType = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = ({ type, data }) => {
  const parsedData = parsersByType[type](data);
  return parsedData;
};

export default parse;
