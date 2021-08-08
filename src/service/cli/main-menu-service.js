const inquirer = require('inquirer');

const { WORM, WARD, PACT, TWIG } = require('../../model/book');

const MainMenuOption = {
  WORM: 'Worm',
  WARD: 'Ward',
  PACT: 'Pact',
  TWIG: 'Twig',
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
    case MainMenuOption.WORM:
      book = WORM;
      break;
    case MainMenuOption.WARD:
      book = WARD;
      break;
    case MainMenuOption.PACT:
      book = PACT;
      break;
    case MainMenuOption.TWIG:
      book = TWIG;
      break;
    default:
      console.log('Exiting...');
      process.exit(0);
  }

  if (answers?.chooseFileTypeMenu) {
    fileType = answers.chooseFileTypeMenu;
    console.log(`book: ${book}`);
    console.log(`fileType: ${fileType}`);
  }
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

module.exports = { mainMenu };