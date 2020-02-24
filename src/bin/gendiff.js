#!/usr/bin/env node

import genDiff from '..';
import app from 'commander';
import { version } from '../../package.json';

app
  .version(version)
  .arguments('<firstConf> <secondConf>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConf, secondConf) => console.log(genDiff(firstConf, secondConf, app.format)))
  .parse(process.argv);
