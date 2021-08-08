const wormUrls = require('./book-urls/worm_urls');
const wardUrls = require('./book-urls/ward_urls');
const pactUrls = require('./book-urls/pact_urls');
const twigUrls = require('./book-urls/twig_urls');
const typos = require('./typos');
const { Book } = require('../model/book');

const AUTHOR = 'John C. McCrae';

const environment = {
    [Book.WORM]: {
        title: Book.WORM,
        author: AUTHOR,
        firstPageUrl: 'https://parahumans.wordpress.com/category/stories-arcs-1-10/arc-1-gestation/1-01/',
        lastPageUrl: 'https://parahumans.wordpress.com/2013/11/19/interlude-end/',
        urls: wormUrls,
        typos: typos[Book.WORM],
    },
    [Book.WARD]: {
        title: Book.WARD,
        author: AUTHOR,
        firstPageUrl: 'https://www.parahumans.net/2017/10/21/glow-worm-0-1/',
        lastPageUrl: 'https://www.parahumans.net/2020/05/02/last-20-end/',
        urls: wardUrls,
        typos: typos[Book.WARD],
    },
    [Book.PACT]: {
        title: Book.PACT,
        author: AUTHOR,
        firstPageUrl: 'https://pactwebserial.wordpress.com/2013/12/17/bonds-1-1/',
        lastPageUrl: 'https://pactwebserial.wordpress.com/2015/03/07/epilogue/',
        urls: pactUrls,
        typos: typos[Book.PACT],
    },
    [Book.TWIG]: {
        title: Book.TWIG,
        author: AUTHOR,
        firstPageUrl: 'https://twigserial.wordpress.com/category/story/arc-1-taking-root/1-01/',
        lastPageUrl: 'https://twigserial.wordpress.com/category/story/epilogue-arc-forest-for-the-trees/e-04/',
        urls: twigUrls,
        typos: typos[Book.TWIG],
    },
    [Book.PALE]: {
        title: Book.PALE,
        author: AUTHOR,
        firstPageUrl: 'https://palewebserial.wordpress.com/2020/05/05/blood-run-cold-0-0/',
        lastPageUrl: '',
        urls: [],
        typos: typos[Book.PALE],
    },
};

module.exports = environment;