const app = require('commander');

app
  .version(process.env.npm_package_version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.');
app
  .option('-f, --format [type]', 'Output format');

export default app;
