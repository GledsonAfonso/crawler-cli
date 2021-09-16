const environment = require('../configuration/environment');
const { General } = require('../configuration/typos');
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
    $('div > p > strong > a:contains("Last Chapter")').parent('strong').parent('p').remove();
    $('div > p > strong > a:contains("Previous")').parent('strong').parent('p').remove();
    $('div > p > a > strong:contains("Previous")').parent('a').parent('p').remove();
    $('div > p > a > strong:contains("Chapter")').parent('a').parent('p').remove();
    
    $('div > p > a[title="Next Chapter"]').parent('p').remove();
    $('div > p > strong > a:contains("Next")').parent('strong').parent('p').remove();

    $('div > p > em:contains("Brief note from the author:")').parent('p').remove();
    
    let entry = $('div.entry-content').html().trim();

    entry = removeTyposFrom(entry, General);
    entry = removeTyposFrom(entry, typos);
    entry = removeMultipleWhiteSpaces(entry);

    return entry;
};

const getNextPageUrlFrom = (book, webpage) => {
    const { rootUrl } = environment[book];
    const $ = cheerio.load(webpage);
    let nextPageUrl = $('a:contains("Next")').attr('href');

    if (nextPageUrl && !nextPageUrl.includes(rootUrl)) {
        nextPageUrl = `${rootUrl}${nextPageUrl}`;
    }

    return nextPageUrl;
};

module.exports = { getTitleFrom, getEntry, getNextPageUrlFrom };