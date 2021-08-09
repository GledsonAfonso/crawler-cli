const fs = require('fs');

const environment = require('../../src/configuration/environment');
const { Book } = require('../../src/model/book');
const { getEpubDirectory, generateEpub } = require('../../src/service/epub-service');

const { fisrtPageObject } = require('../fixtures/worm');

describe('epub service', () => {
    afterAll(() => {
        fs.rmdirSync(getEpubDirectory(), { recursive: true });
    });

    test('should be able to generate a epub file from a book object', async () => {
        const title = 'test';
        const author = environment[Book.WORM].author;
        const pages = [ fisrtPageObject ];

        await generateEpub(title, author, pages);

        const doesDirExist = fs.existsSync(`${getEpubDirectory()}/${title}.epub`);
        expect(doesDirExist).toBeTruthy();
    });
});