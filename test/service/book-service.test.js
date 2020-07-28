const environment = require('../../src/configuration/environment');
const { WORM, WARD, PACT, TWIG } = require('../../src/model/book');
const { generateBookUrlsFileFor, getPageFor, getPagesFor } = require('../../src/service/book-service');

const wormFixture = require('../fixtures/worm');
const wardFixture = require('../fixtures/ward');
const pactFixture = require('../fixtures/pact');
const twigFixture = require('../fixtures/twig');

//
// Only run this if you need to get all book's urls - be advised though, this will take a lot of time,
// so remember to set testTimeout in jest.config.js to at least 1000000 before running each test separately

// describe('book service - setup', () => {
    // test(`should be able to make a list with all Worm page's urls`, async () => {
    //     await generateBookUrlsFileFor(WORM);
    // });

    // test(`should be able to make a list with all Ward page's urls`, async () => {
    //     await generateBookUrlsFileFor(WARD);
    // });

    // test(`should be able to make a list with all Pact page's urls`, async () => {
    //     await generateBookUrlsFileFor(PACT);
    // });

    // Twig is giving some kind of error when trying to download chapter 8.4. So, if you need to use this,
    // you will need to download until 8.3, add 8.4 manually and then continue from 8.5 as the first page
    // test(`should be able to make a list with all Twig page's urls`, async () => {
    //     await generateBookUrlsFileFor(TWIG);
    // });
// });

//
// These test take too long to finish. Better keep then like this until it is necessary to test
// "getPagesFor" method

// describe('book service', () => {
//     test('should be able to get the entire Worm book', async () => {
//         const pages = await getPagesFor(WORM);
//         expect(pages.length).toBe(304);
//     });

//     test('should be able to get the entire Ward book', async () => {
//         const pages = await getPagesFor(WARD);
//         expect(pages.length).toBe(280);
//     });

//     test('should be able to get the entire Pact book', async () => {
//         const pages = await getPagesFor(PACT);
//         expect(pages.length).toBe(153);
//     });

//     test('should be able to get the entire Twig book', async () => {
//         const pages = await getPagesFor(TWIG);
//         expect(pages.length).toBe(321);
//     });
// });

describe('book service', () => {
    test('should be able to get the first page for Worm', async () => {
        const { firstPageUrl, typos } = environment[WORM];

        const page = await getPageFor({
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Gestation 1.1');
        expect(page.entry).toMatchIgnoringWhitespaces(wormFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://parahumans.wordpress.com/2011/06/14/gestation-1-2/');
    });

    test('should be able to get the last page for Worm and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[WORM];

        const page = await getPageFor({
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Interlude: End');
        expect(page.entry).toMatchIgnoringWhitespaces(wormFixture.lastPage);
        expect(page.nextPageUrl).toBeUndefined();
    });

    test('should be able to get the first page for Ward', async () => {
        const { firstPageUrl, typos } = environment[WARD];

        const page = await getPageFor({
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Glow-worm – 0.1');
        expect(page.entry).toMatchIgnoringWhitespaces(wardFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://www.parahumans.net/2017/10/24/glow-worm-0-2/');
    });

    test('should be able to get the last page for Ward and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[WARD];

        const page = await getPageFor({
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Last – 20.end');
        expect(page.entry).toMatchIgnoringWhitespaces(wardFixture.lastPage);
        expect(page.nextPageUrl).toBeUndefined();
    });

    test('should be able to get the first page for Pact', async () => {
        const { firstPageUrl, typos } = environment[PACT];

        const page = await getPageFor({
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Bonds 1.1');
        expect(page.entry).toMatchIgnoringWhitespaces(pactFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://pactwebserial.wordpress.com/2013/12/17/bonds-1-2/');
    });

    test('should be able to get the last page for Pact and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[PACT];

        const page = await getPageFor({
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toBe('Epilogue');
        expect(page.entry).toMatchIgnoringWhitespaces(pactFixture.lastPage);
        expect(page.nextPageUrl).toBeUndefined();
    });

    test('should be able to get the first page for Twig', async () => {
        const { firstPageUrl, typos } = environment[TWIG];

        const page = await getPageFor({
            currentPageUrl: firstPageUrl,
            typos
        });

        expect(page.title).toBe('Taking Root 1.1');
        expect(page.entry).toMatchIgnoringWhitespaces(twigFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://twigserial.wordpress.com/2015/03/14/taking-root-1-2/');
    });

    test('should be able to get the last page for Twig and it should not have an url for the next page', async () => {
        const { lastPageUrl, typos } = environment[TWIG];

        const page = await getPageFor({
            currentPageUrl: lastPageUrl,
            lastPageUrl,
            typos
        });

        expect(page.title).toMatchIgnoringWhitespaces('Forest for the Trees – e.4');
        expect(page.entry).toMatchIgnoringWhitespaces(twigFixture.lastPage);
        expect(page.nextPageUrl).toBeUndefined();
    });
});