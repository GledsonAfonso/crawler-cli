const environment = require('../configuration/environment');
const { WORM, WARD, PACT, TWIG } = require('../model/book');

const cheerio = require('cheerio');

const getTitleFrom = (webpage) => {
    const $ = cheerio.load(webpage);
    return $('h1.entry-title').text();
};

const getEntryFrom = (webpage) => {
    let $ = cheerio.load(webpage);
    $('div.sharedaddy').remove();

    return $('div.entry-content').html();
};

const getNextPageUrlFrom = (webpage) => {
    const $ = cheerio.load(webpage);
    return $('a:contains("Next")').attr('href');
};

const getConfigurationFor = (book) => {
    let configuration = {
        url: undefined,
        uri: undefined,
    };

    switch (book) {
        case WORM:
            configuration = {
                url: environment.wormUrl,
                uri: environment.wormStartUri,
            };
            break;
        case WARD:
            configuration = {
                url: environment.wardUrl,
                uri: environment.wardStartUri,
            };
            break;
        case PACT:
            configuration = {
                url: environment.pactUrl,
                uri: environment.pactStartUri,
            };
            break;
        case TWIG:
            configuration = {
                url: environment.twigUrl,
                uri: environment.twigStartUri,
            };
            break;
        default:
            throw new Error(`Invalid parameter for book. Possible unsupported book given: ${book}`);
            break;
    }

    return configuration;
};

module.exports = { getTitleFrom, getEntryFrom, getNextPageUrlFrom, getConfigurationFor };