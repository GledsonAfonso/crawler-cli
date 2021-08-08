const environment = require('../../src/configuration/environment');
const { Book } = require('../../src/model/book');
const { generateBookUrlsFileFor, getPageFor, getPagesFor } = require('../../src/service/book-service');

const wormFixture = require('../fixtures/worm');
const wardFixture = require('../fixtures/ward');
const pactFixture = require('../fixtures/pact');
const twigFixture = require('../fixtures/twig');

const comparePages = (acquiredPage, fixturePage) => {
    const acquiredPageParagraphs = acquiredPage.split('</p>');
    const acquiredPageParagraphsSize = acquiredPageParagraphs.length;

    const fixturePageParagraphs = fixturePage.split('</p>');
    const fixturePageParagraphsSize = fixturePageParagraphs.length;

    expect(acquiredPageParagraphsSize).toBe(fixturePageParagraphsSize);

    for (let i = 0; i < acquiredPageParagraphsSize; i++) {
        expect(acquiredPageParagraphs[i]).toMatchIgnoringWhitespaces(fixturePageParagraphs[i]);
    }
};

//
// Only run this if you need to get all book's urls - be advised though, this will take a lot of time,
// so remember to set testTimeout in jest.config.js to at least 1000000 before running each test separately

// describe('book service - setup', () => {
    // test(`should be able to make a list with all Worm page's urls`, async () => {
    //     await generateBookUrlsFileFor(Book.WORM);
    // });

    // test(`should be able to make a list with all Ward page's urls`, async () => {
    //     await generateBookUrlsFileFor(Book.WARD);
    // });

    // test(`should be able to make a list with all Pact page's urls`, async () => {
    //     await generateBookUrlsFileFor(Book.PACT);
    // });

    // Twig is giving some kind of error when trying to download chapter 8.4. So, if you need to use this,
    // you will need to download until 8.3, add 8.4 manually and then continue from 8.5 as the first page
    // test(`should be able to make a list with all Twig page's urls`, async () => {
    //     await generateBookUrlsFileFor(Book.TWIG);
    // });
// });

//
// These test take too long to finish. Better keep then like this until it is necessary to test
// "getPagesFor" method

// describe('book service', () => {
//     test('should be able to get the entire Worm book', async () => {
//         const pages = await getPagesFor(Book.WORM);
//         expect(pages.length).toBe(304);
//     });

//     test('should be able to get the entire Ward book', async () => {
//         const pages = await getPagesFor(Book.WARD);
//         expect(pages.length).toBe(280);
//     });

//     test('should be able to get the entire Pact book', async () => {
//         const pages = await getPagesFor(Book.PACT);
//         expect(pages.length).toBe(153);
//     });

//     test('should be able to get the entire Twig book', async () => {
//         const pages = await getPagesFor(Book.TWIG);
//         expect(pages.length).toBe(321);
//     });
// });

describe('book service', () => {
    test('should be able to get the first page for Worm', async () => {
        const { firstPageUrl, typos } = environment[Book.WORM];

        const page = await getPageFor({
            book: Book.WORM,
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Gestation 1.1');
        expect(page.nextPageUrl).toBe('https://parahumans.wordpress.com/2011/06/14/gestation-1-2/');

        comparePages(page.entry, wormFixture.firstPage);
    });

    test('should be able to get the last page for Worm and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[Book.WORM];

        const page = await getPageFor({
            book: Book.WORM,
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Interlude: End');
        expect(page.nextPageUrl).toBeUndefined();
        
        comparePages(page.entry, wormFixture.lastPage);
    });

    test('should be able to get the first page for Ward', async () => {
        const { firstPageUrl, typos } = environment[Book.WARD];

        const page = await getPageFor({
            book: Book.WARD,
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Glow-worm – 0.1');
        expect(page.nextPageUrl).toBe('https://www.parahumans.net/2017/10/24/glow-worm-0-2/');

        comparePages(page.entry, wardFixture.firstPage);
    });

    test('should be able to get the last page for Ward and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[Book.WARD];

        const page = await getPageFor({
            book: Book.WARD,
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Last – 20.end');
        expect(page.nextPageUrl).toBeUndefined();
        
        comparePages(page.entry, wardFixture.lastPage);
    });

    test('should be able to get the first page for Pact', async () => {
        const { firstPageUrl, typos } = environment[Book.PACT];

        const page = await getPageFor({
            book: Book.PACT,
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Bonds 1.1');
        expect(page.nextPageUrl).toBe('https://pactwebserial.wordpress.com/2013/12/17/bonds-1-2/');
        
        comparePages(page.entry, pactFixture.firstPage);
    });

    test('should be able to get the last page for Pact and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[Book.PACT];

        const page = await getPageFor({
            book: Book.PACT,
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Epilogue');
        expect(page.nextPageUrl).toBeUndefined();
        
        comparePages(page.entry, pactFixture.lastPage);
    });

    test('should be able to get the first page for Twig', async () => {
        const { firstPageUrl, typos } = environment[Book.TWIG];

        const page = await getPageFor({
            book: Book.TWIG,
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Taking Root 1.1');
        expect(page.nextPageUrl).toBe('https://twigserial.wordpress.com/2015/03/14/taking-root-1-2/');
        
        comparePages(page.entry, twigFixture.firstPage);
    });

    test('should be able to get the last page for Twig and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[Book.TWIG];

        const page = await getPageFor({
            book: Book.TWIG,
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toMatchIgnoringWhitespaces('Forest for the Trees – e.4');
        expect(page.nextPageUrl).toBeUndefined();
        
        comparePages(page.entry, twigFixture.lastPage);
    });
});