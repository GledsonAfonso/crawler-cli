const environment = require('../../src/configuration/environment');
const { getPageFor } = require('../../src/service/book-service');

const pactFixture = require('../fixtures/pact');

describe('book service', () => {
    const url = environment.pactUrl;
    const uri = environment.pactStartUri;

    test('should get a page for Pact normally', async () => {
        const page = await getPageFor(url, uri);

        expect(page.title).toBe('Bonds 1.1')
        expect(page.entry).toBe(pactFixture.firstPage);
        expect(page.nextPageUrl).toBe('https://pactwebserial.wordpress.com/2013/12/17/bonds-1-2/');
    });
});