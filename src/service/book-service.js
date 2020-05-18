const { get } = require('./http-service');
const { getTitleFrom, getEntryFrom, getNextPageUrlFrom } = require('../util/book-utils');

const getPageFor = async (url, uri) => {
    const webpage = await get(url, uri);

    const title = getTitleFrom(webpage);
    const entry = getEntryFrom(webpage);
    const nextPageUrl = getNextPageUrlFrom(webpage);

    return { title, entry, nextPageUrl };
};

module.exports = { getPageFor };