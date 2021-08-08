const environment = require('../configuration/environment');
const { removeMultipleWhiteSpaces, removeTyposFrom } = require('./text-utils');

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
    $('div > p > strong > a:contains("Previous")').parent('strong').parent('p').remove();
    $('div > p > a > strong:contains("Previous")').parent('a').parent('p').remove();
    
    $('div > p > a[title="Next Chapter"]').parent('p').remove();
    $('div > p > strong > a:contains("Next")').parent('strong').parent('p').remove();

    $('div > p > em:contains("Brief note from the author:")').parent('p').remove();

    let entry = $('div.entry-content').html().trim();
    entry = removeTyposFrom(entry, typos);
    entry = removeMultipleWhiteSpaces(entry);

    return entry;
};

const getNextPageUrlFrom = (webpage) => {
    const $ = cheerio.load(webpage);
    return $('a:contains("Next")').attr('href');
};

const getConfigurationFor = (book) => {
    let configuration = {
        firstPageUrl: undefined,
        lastPageUrl: undefined,
        urls: undefined,
        typos: {}
    };

    try {
        configuration = {
            firstPageUrl: environment[book].firstPageUrl,
            lastPageUrl: environment[book].lastPageUrl,
            urls: environment[book].urls,
            typos: environment[book].typos,
        };
    } catch (error) {
        throw new Error(`Invalid parameter for book. Possible unsupported book given: ${book}`);
    }

    return configuration;
};

module.exports = { getTitleFrom, getEntry, getNextPageUrlFrom, getConfigurationFor };