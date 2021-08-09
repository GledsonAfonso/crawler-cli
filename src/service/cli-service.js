const inquirer = require('inquirer');

const { Book, BookExtension } = require('../model/book');
const { generateBookFor } = require('./book-service');

const MainMenuOption = {
  ...Book,
  EXIT: 'Exit'
};

const ChooseBookExtensionMenuOption = {
  ...BookExtension
}

const _act = async (answers) => {
  let bookTitle;
  let bookExtension;

  if (answers?.mainMenu) {
    if (answers.mainMenu === MainMenuOption.EXIT) {
      console.log('Exiting...');
      process.exit(0);
    }

    bookTitle = answers.mainMenu;
  }

  if (answers?.chooseBookExtensionMenu) {
    bookExtension = answers.chooseBookExtensionMenu;
    await generateBookFor(bookTitle, bookExtension);
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
    },
    {
      type: 'list',
      name: 'chooseBookExtensionMenu',
      message: 'Which type?',
      choices: [
        ...Object.values(ChooseBookExtensionMenuOption)
      ],
      when: (answers) => answers?.mainMenu !== MainMenuOption.EXIT
    }
  ];

  while (true) {
    await inquirer
      .prompt(prompts)
      .then(_act);
  }
};

module.exports = { cli };