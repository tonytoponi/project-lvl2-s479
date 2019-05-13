import compareJson from './modules/genDiff';

const app = require('commander');

app
  .version(process.env.npm_package_version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstConfig, secondConfig) => console.log(compareJson(firstConfig, secondConfig)));
app
  .option('-f, --format [type]', 'Output format');

export default app;
