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

module.exports = { getTitleFrom, getEntryFrom, getNextPageUrlFrom };