const environment = require('../../src/configuration/environment');
const { getPageFor } = require('../../src/service/book-service');

const pactFixture = require('../fixtures/pact');

describe('book service', () => {
    const url = environment.pactUrl;
    const uri = environment.pactStartUri;

    test('should be able to get the first page for Pact', async () => {
        const page = await getPageFor(url, uri);

        expect(page.title).toBe('Bonds 1.1')
        expect(page.entry).toBe(pactFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://pactwebserial.wordpress.com/2013/12/17/bonds-1-2/');
    });

    test('should be able to get the last page for Pact and it should not have an url for the next page', async () => {
        const lastPageUri = '/2015/03/07/epilogue/';
        const page = await getPageFor(url, lastPageUri);

        expect(page.title).toBe('Epilogue');
        expect(page.entry).toBe(pactFixture.lastPage);
        expect(page.nextPageUrl).toBeUndefined();
    });
});