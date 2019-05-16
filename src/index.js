import compareJson from './modules/genDiff';
import { version } from '../package.json';

const app = require('commander');

app
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => console.log(compareJson(firstConfig, secondConfig)));
app
  .option('-f, --format [type]', 'Output format');

export default app;
