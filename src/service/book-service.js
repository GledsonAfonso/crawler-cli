const { get } = require('./http-service');
const { getTitleFrom, getEntryFrom, getNextPageUrlFrom, getConfigurationFor } = require('../util/book-utils');

const getPageFor = async (url, uri) => {
    const webpage = await get(url, uri);

    const title = getTitleFrom(webpage);
    const entry = getEntryFrom(webpage);
    const nextPageUrl = getNextPageUrlFrom(webpage);

    return { title, entry, nextPageUrl };
};

const getPagesFor = async (book) => {
    let pages = [];

    const configuration = getConfigurationFor(book);

    const fn = async (configuration) => {
        const page = await getPageFor(...configuration);
        pages.push(page);

        if (page.nextPageUrl) {
            configuration.uri = page.nextPageUrl;
            await fn(configuration);
        }
    };

    await fn(configuration);

    return pages;
};

module.exports = { getPageFor, getPagesFor };