const environment = require('../configuration/environment');
const { removeTyposFrom } = require('./text-utils');

const cheerio = require('cheerio');

const getTitleFrom = (webpage) => {
    const $ = cheerio.load(webpage);
    return $('h1.entry-title').text();
};

const getEntry = (webpage, typos) => {
    const $ = cheerio.load(webpage, {
        decodeEntities: false,
        normalizeWhitespace: true,
    });

    $('div.sharedaddy').remove();
    $('div > p > a:contains("Last Chapter")').parent('p').remove();
    $('div > p > a[title="Next Chapter"]').parent('p').remove();
    $('div > p > em:contains("Brief note from the author:")').parent('p').remove();

    let entry = $('div.entry-content').html().trim();
    entry = removeTyposFrom(entry, typos);

    return entry;
};

const getNextPageUrlFrom = (webpage) => {
    const $ = cheerio.load(webpage);
    return $('a:contains("Next")').attr('href');
};

const getConfigurationFor = (book) => {
    let configuration = {
        url: undefined,
        uri: undefined,
        typos: {}
    };

    try {
        configuration = {
            url: environment[book].url,
            uri: environment[book].startUri,
            typos: environment[book].typos,
        };
    } catch (error) {
        throw new Error(`Invalid parameter for book. Possible unsupported book given: ${book}`);
    }

    return configuration;
};

module.exports = { getTitleFrom, getEntry, getNextPageUrlFrom, getConfigurationFor };