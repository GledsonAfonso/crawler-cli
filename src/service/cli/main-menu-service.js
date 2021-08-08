const inquirer = require('inquirer');

const { WORM, WARD, PACT, TWIG } = require('../../model/book');
const MainMenuOption = {
  WORM,
  WARD,
  PACT,
  TWIG,
  EXIT: 'Exit'
};

const ChooseFileTypeMenuOption = {
  EPUB: '.epub',
  MOBI: '.mobi'
}

const _act = async (answers) => {
  let book;
  let fileType;

  switch (answers?.mainMenu) {
    case MainMenuOption.EXIT:
    case MainMenuOption.WARD:
    case MainMenuOption.PACT:
    case MainMenuOption.TWIG:
      book = answers.mainMenu;
      break;
    default:
      console.log('Exiting...');
      process.exit(0);
  }

  if (answers?.chooseFileTypeMenu) {
    fileType = answers.chooseFileTypeMenu;
  }

  console.log(`book: ${book}`);
  console.log(`fileType: ${fileType}`);
};

const mainMenu = async () => {
  const prompts = [
    {
      type: 'list',
      name: 'mainMenu',
      message: 'Which book do you want?',
      choices: [
        MainMenuOption.WORM,
        MainMenuOption.WARD,
        MainMenuOption.PACT,
        MainMenuOption.TWIG,
        MainMenuOption.EXIT
      ]
    },
    {
      type: 'list',
      name: 'chooseFileTypeMenu',
      message: 'Which type?',
      choices: [
        ChooseFileTypeMenuOption.EPUB,
        ChooseFileTypeMenuOption.MOBI
      ]
    }
  ];

  while (true) {
    await inquirer
      .prompt(prompts)
      .then(_act);
  }
};

module.exports = { mainMenu };