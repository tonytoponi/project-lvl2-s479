import recursiveRender from './recursive';
import plainRender from './plain';


const render = (diff, format) => {
  if (format === 'plain') {
    return plainRender(diff);
  }
  return recursiveRender(diff);
};

export default render;
