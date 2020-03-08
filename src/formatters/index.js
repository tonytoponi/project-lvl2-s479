import recursiveRender from './recursive';
import plainRender from './plain';
import jsonRender from './json';


const render = (diffAst, format) => {
  if (format === 'plain') {
    return plainRender(diffAst);
  }
  if (format === 'json') {
    return jsonRender(diffAst);
  }
  return recursiveRender(diffAst);
};

export default render;
