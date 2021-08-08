const envPath = `${__dirname}/.env`;

require('dotenv').config({ path: envPath });
require('./src/configuration/environment');

const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const { mainMenu } = require('./service/cli/main-menu-service');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('crawler', { horizontalLayout: 'full' })
  )
);

(async () => {
  await mainMenu();
})();