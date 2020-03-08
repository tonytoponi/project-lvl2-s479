#!/usr/bin/env node

import app from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

app
  .version(version)
  .arguments('<firstConf> <secondConf>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConf, secondConf) => console.log(genDiff(firstConf, secondConf, app.format)))
  .parse(process.argv);
