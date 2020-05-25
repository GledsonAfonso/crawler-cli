const environment = require('../../src/configuration/environment');
const { WORM, WARD, PACT, TWIG } = require('../../src/model/book');
const { getPageFor } = require('../../src/service/book-service');

const wormFixture = require('../fixtures/worm');
const wardFixture = require('../fixtures/ward');
const pactFixture = require('../fixtures/pact');
const twigFixture = require('../fixtures/twig');

describe('book service', () => {
    test('should be able to get the first page for Worm', async () => {
        const { url, startUri, typos } = environment[WORM];

        const page = await getPageFor(url, startUri, typos);

        expect(page.title).toBe('Gestation 1.1');
        expect(page.entry).toBe(wormFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://parahumans.wordpress.com/2011/06/14/gestation-1-2/');
    });

    // test('should be able to get the last page for Worm and it should not have an url for the next page', async () => {
    //     const { url, typos } = environment[WORM];
    //     const lastPageUri = '/2013/11/19/interlude-end/';
        
    //     const page = await getPageFor(url, lastPageUri, typos);

    //     console.log(page.entry);

    //     expect(page.title).toBe('Interlude: End');
    //     expect(page.entry).toBe(wormFixture.lastPage);
    //     expect(page.nextPageUrl).toBeUndefined();
    // });

    // test('should be able to get the first page for Ward', async () => {
    //     const page = await getPageFor(environment.wardUrl, environment.wardStartUri);

    //     expect(page.title).toBe('Glow-worm – 0.1');
    //     expect(page.entry).toBe(wardFixture.firstPage);
    //     expect(page.nextPageUrl).toBe('https://www.parahumans.net/2017/10/24/glow-worm-0-2/');
    // });

    // test('should be able to get the last page for Ward and it should not have an url for the next page', async () => {
    //     const lastPageUri = '/2020/05/02/last-20-end/';
    //     const page = await getPageFor(environment.wardUrl, lastPageUri);

    //     expect(page.title).toBe('Last – 20.end');
    //     expect(page.entry).toBe(wardFixture.lastPage);
    //     expect(page.nextPageUrl).toBeUndefined();
    // });

    // test('should be able to get the first page for Pact', async () => {
    //     const page = await getPageFor(environment.pactUrl, environment.pactStartUri);

    //     expect(page.title).toBe('Bonds 1.1');
    //     expect(page.entry).toBe(pactFixture.firstPage);
    //     expect(page.nextPageUrl).toBe('https://pactwebserial.wordpress.com/2013/12/17/bonds-1-2/');
    // });

    // test('should be able to get the last page for Pact and it should not have an url for the next page', async () => {
    //     const lastPageUri = '/2015/03/07/epilogue/';
    //     const page = await getPageFor(environment.pactUrl, lastPageUri);

    //     expect(page.title).toBe('Epilogue');
    //     expect(page.entry).toBe(pactFixture.lastPage);
    //     expect(page.nextPageUrl).toBeUndefined();
    // });

    // test('should be able to get the first page for Twig', async () => {
    //     const page = await getPageFor(environment.twigUrl, environment.twigStartUri);

    //     expect(page.title).toBe('Taking Root 1.1');
    //     expect(page.entry).toBe(twigFixture.firstPage);
    //     expect(page.nextPageUrl).toBe('https://twigserial.wordpress.com/2015/03/14/taking-root-1-2/');
    // });

    // test('should be able to get the last page for Twig and it should not have an url for the next page', async () => {
    //     const lastPageUri = '/category/story/epilogue-arc-forest-for-the-trees/e-04/';
    //     const page = await getPageFor(environment.twigUrl, lastPageUri);

    //     expect(page.title).toBe('Forest for the Trees – e.4');
    //     expect(page.entry).toBe(twigFixture.lastPage);
    //     expect(page.nextPageUrl).toBeUndefined();
    // });


    // TODO: write test case for getPagesFor (tip: test quantity of pages instead of make fixtures for each page)
});