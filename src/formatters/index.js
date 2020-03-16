import recursiveRender from './recursive';
import plainRender from './plain';
import jsonRender from './json';

const renderByFormat = {
  plain: plainRender,
  json: jsonRender,
  recursive: recursiveRender,
};

const render = (diffAst, format) => {
  const renderedDiff = renderByFormat[format](diffAst);
  return renderedDiff;
};

export default render;
