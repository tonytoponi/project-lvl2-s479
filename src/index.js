import parse from './modules/parser';
import build from './modules/diffAstBuilder';
import render from './modules/formatters';

const genDiff = (firstFilePath, secondFilePath, format = 'recursive') => {
  const [firstFile, secondFile] = parse(firstFilePath, secondFilePath);
  const diff = build(firstFile, secondFile);
  const renderedDiff = render(diff, format);
  return renderedDiff;
};

export default genDiff;
