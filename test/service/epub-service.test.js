const fs = require('fs');

const environment = require('../../src/configuration/environment');
const { WORM } = require('../../src/model/book');
const { getEpubDirectory, generateEpub } = require('../../src/service/epub-service');

const { fisrtPageObject } = require('../fixtures/worm');

describe('epub service', () => {
    test('should be able to generate a epub file from a book object', async () => {
        const title = environment[WORM].title;
        const author = environment[WORM].author;
        const pages = [ fisrtPageObject ];

        await generateEpub(title, author, pages);

        const doesDirExist = fs.existsSync(`${getEpubDirectory()}/${title}.epub`);
        expect(doesDirExist).toBeTruthy();
    });
});