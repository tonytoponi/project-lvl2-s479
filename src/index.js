import parse from './modules/parser';
import build from './modules/diffBuilder';
import render from './modules/renderer';

const genDiff = (firstFilePath, secondFilePath) => {
  const [firstFile, secondFile] = parse(firstFilePath, secondFilePath);
  const diff = build(firstFile, secondFile);
  const renderedDiff = render(diff);
  return renderedDiff;
};

export default genDiff;
