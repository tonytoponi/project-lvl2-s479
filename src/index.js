import fs from 'fs';
import { resolve, extname } from 'path';
import parse from './parser';
import buildDiffAst from './diffAstBuilder';
import render from './formatters';


const genDiff = (firstFilePath, secondFilePath, format = 'recursive') => {
  const firstFileData = fs.readFileSync(resolve(firstFilePath), 'utf-8');
  const firstFileType = extname(firstFilePath).slice(1);
  const secondFileData = fs.readFileSync(resolve(secondFilePath), 'utf-8');
  const secondFileType = extname(firstFilePath).slice(1);
  const firstData = parse({
    type: firstFileType,
    data: firstFileData,
  });
  const secondData = parse({
    type: secondFileType,
    data: secondFileData,
  });
  const diffAst = buildDiffAst(firstData, secondData);
  const renderedDiff = render(diffAst, format);
  return renderedDiff;
};

export default genDiff;
