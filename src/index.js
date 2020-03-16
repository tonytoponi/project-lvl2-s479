import fs from 'fs';
import { resolve, extname } from 'path';
import parse from './parser';
import buildDiffAst from './diffAstBuilder';
import render from './formatters';

const readFile = (path) => {
  const fullPath = resolve(path);
  const type = extname(fullPath).slice(1);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return { type, data };
};

const genDiff = (firstFilePath, secondFilePath, format = 'recursive') => {
  const firstFile = readFile(firstFilePath);
  const secondFile = readFile(secondFilePath);
  const firstData = parse(firstFile.type, firstFile.data);
  const secondData = parse(secondFile.type, secondFile.data);
  const diffAst = buildDiffAst(firstData, secondData);
  const renderedDiff = render(diffAst, format);
  return renderedDiff;
};

export default genDiff;
