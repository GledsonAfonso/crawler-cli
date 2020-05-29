const { get } = require('./http-service');
const { getTitleFrom, getEntry, getNextPageUrlFrom, getConfigurationFor } = require('../util/book-utils');

const getPageFor = async ({currentPageUrl, lastPageUrl, typos}) => {
    const webpage = await get(currentPageUrl);

    const title = getTitleFrom(webpage);
    const entry = getEntry(webpage, typos);
    const nextPageUrl = (`${currentPageUrl}` !== `${lastPageUrl}`) ? getNextPageUrlFrom(webpage) : undefined;

    return { title, entry, nextPageUrl };
};

const getPagesFor = async (book) => {
    let pages = [];

    const fn = async (configuration) => {
        const page = await getPageFor(...configuration);
        pages.push(page);

        if (page.nextPageUrl) {
            configuration.currentPageUrl = page.nextPageUrl;
            await fn(configuration);
        }
    };

    await fn(getConfigurationFor(book));

    return pages;
};

module.exports = { getPageFor, getPagesFor };