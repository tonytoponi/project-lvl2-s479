import recursiveRender from './recursive';
import plainRender from './plain';
import jsonRender from './json';


const render = (diff, format) => {
  if (format === 'plain') {
    return plainRender(diff);
  }
  if (format === 'json') {
    return jsonRender(diff);
  }
  return recursiveRender(diff);
};

export default render;
