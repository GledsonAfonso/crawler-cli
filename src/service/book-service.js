const fs = require('fs');
const asyncPool = require('tiny-async-pool');

const environment = require('../configuration/environment');
const { get } = require('./http-service');
const { getTitleFrom, getEntry, getNextPageUrlFrom, getConfigurationFor } = require('../util/book-utils');

const BOOK_URLS_DIRECTORY = 'src/configuration/book-urls';

const _getBookUrlsFor = async (currentPageUrl, lastPageUrl, urls = [currentPageUrl]) => {
    const webpage = await get(currentPageUrl);
    const url = (`${currentPageUrl}` !== `${lastPageUrl}`) ? getNextPageUrlFrom(webpage) : undefined;

    if (url) {
        return _getBookUrlsFor(url, lastPageUrl, [...urls, url]);
    } else {
        return urls;
    }
};

const generateBookUrlsFileFor = async (book) => {
    const { firstPageUrl, lastPageUrl } = environment[book];

    let template = '[\nurls\n]';
    let urlsString = '';

    const urls = await _getBookUrlsFor(firstPageUrl, lastPageUrl);
    urls.forEach(url => {
        urlsString += `"${url}",\n`;
    });

    urlsString = template.replace('urls', urlsString);
    urlsString = urlsString.replace(',\n\n]', '\n]');

    if (!fs.existsSync(BOOK_URLS_DIRECTORY)) {
        fs.mkdirSync(BOOK_URLS_DIRECTORY);
    }

    fs.writeFileSync(`${BOOK_URLS_DIRECTORY}/${book}_urls.json`, urlsString);
};

const getPageFor = async ({ currentPageUrl, lastPageUrl, pageNumber, typos }) => {
    const webpage = await get(currentPageUrl);

    const title = getTitleFrom(webpage);
    const entry = getEntry(webpage, typos);
    const nextPageUrl = (`${currentPageUrl}` !== `${lastPageUrl}`) ? getNextPageUrlFrom(webpage) : undefined;

    return { pageNumber, title, entry, nextPageUrl };
};

const getPagesFor = async (book, poolLimit = 13) => {
    const { lastPageUrl, urls, typos } = getConfigurationFor(book);

    const configurations = urls.map((url, pageNumber) => ({
        currentPageUrl: url,
        lastPageUrl,
        pageNumber,
        typos
    }));

    return await asyncPool(poolLimit, configurations, getPageFor);
};

module.exports = { generateBookUrlsFileFor, getPageFor, getPagesFor };