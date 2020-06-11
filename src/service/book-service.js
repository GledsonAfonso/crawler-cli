const { get } = require('./http-service');
const { getTitleFrom, getEntry, getNextPageUrlFrom, getConfigurationFor } = require('../util/book-utils');

const getPageFor = async ({currentPageUrl, lastPageUrl, typos}) => {
    const webpage = await get(currentPageUrl);

    const title = getTitleFrom(webpage);
    const entry = getEntry(webpage, typos);
    const nextPageUrl = (`${currentPageUrl}` !== `${lastPageUrl}`) ? getNextPageUrlFrom(webpage) : undefined;

    return { title, entry, nextPageUrl };
};

const getPagesFor = async (book, pages = []) => {
    const configuration = getConfigurationFor(book);

    const page = await getPageFor(configuration); // need to be parallel. It will take too long otherwise
    pages.push(page);

    if (page.nextPageUrl) {
        configuration.currentPageUrl = page.nextPageUrl;
        return await getPagesFor(book, pages);
    } else {
        return pages;
    }
};

module.exports = { getPageFor, getPagesFor };