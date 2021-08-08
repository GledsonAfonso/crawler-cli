const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const { cli } = require('./service/cli-service');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('crawler', { horizontalLayout: 'full' })
  )
);

(async () => {
  await cli();
})();