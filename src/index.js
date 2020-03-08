import fs from 'fs';
import { resolve, extname } from 'path';
import parse from './parser';
import buildDiffAst from './diffAstBuilder';
import render from './formatters';


const genDiff = (firstFilePath, secondFilePath, format = 'recursive') => {
  const firstFileData = fs.readFileSync(resolve(firstFilePath), 'utf-8');
  const firstFileType = extname(firstFilePath);
  const secondFileData = fs.readFileSync(resolve(secondFilePath), 'utf-8');
  const secondFileType = extname(secondFilePath);
  const firstData = parse(firstFileData, firstFileType);
  const secondData = parse(secondFileData, secondFileType);
  const diff = buildDiffAst(firstData, secondData);
  const renderedDiff = render(diff, format);
  return renderedDiff;
};

export default genDiff;
