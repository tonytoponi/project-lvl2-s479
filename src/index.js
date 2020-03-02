import fs from 'fs';
import { resolve, extname } from 'path';
import parse from './parser';
import build from './diffAstBuilder';
import render from './formatters';


const genDiff = (firstFilePath, secondFilePath, format = 'recursive') => {
  const firstFileData = fs.readFileSync(resolve(firstFilePath), 'utf-8');
  const firstFileType = extname(firstFilePath);
  const secondFileData = fs.readFileSync(resolve(secondFilePath), 'utf-8');
  const secondFileType = extname(secondFilePath);
  const parsedFirstFile = parse(firstFileData, firstFileType);
  const parsedSecondFile = parse(secondFileData, secondFileType);
  const diff = build(parsedFirstFile, parsedSecondFile);
  const renderedDiff = render(diff, format);
  return renderedDiff;
};

export default genDiff;
