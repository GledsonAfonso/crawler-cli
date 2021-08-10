const inquirer = require('inquirer');

const { Book } = require('../model/book');
const { generateBookFor } = require('./book-service');

const MainMenuOption = {
  ...Book,
  EXIT: 'Exit'
};

const _act = async (answers) => {
  if (answers?.mainMenu) {
    if (answers.mainMenu === MainMenuOption.EXIT) {
      console.log('Exiting...');
      process.exit(0);
    }

    await generateBookFor(answers.mainMenu);
  }
};

const cli = async () => {
  const prompts = [
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Which book do you want?',
      choices: [
        ...Object.values(MainMenuOption).filter(option => option !== Book.PALE)
      ]
    }
  ];

  while (true) {
    await inquirer
      .prompt(prompts)
      .then(_act);
  }
};

module.exports = { cli };