const typos = require('./typos');
const { WORM, WARD, PACT, TWIG, PALE } = require('../model/book');

const environment = {
    [WORM]: {
        firstPageUrl: 'https://parahumans.wordpress.com/category/stories-arcs-1-10/arc-1-gestation/1-01/',
        lastPageUrl: 'https://parahumans.wordpress.com/2013/11/19/interlude-end/',
        typos: typos[WORM],
    },
    [WARD]: {
        firstPageUrl: 'https://www.parahumans.net/2017/10/21/glow-worm-0-1/',
        lastPageUrl: 'https://www.parahumans.net/2020/05/02/last-20-end/',
        typos: typos[WARD],
    },
    [PACT]: {
        firstPageUrl: 'https://pactwebserial.wordpress.com/2013/12/17/bonds-1-1/',
        lastPageUrl: 'https://pactwebserial.wordpress.com/2015/03/07/epilogue/',
        typos: typos[PACT],
    },
    [TWIG]: {
        firstPageUrl: 'https://twigserial.wordpress.com/category/story/arc-1-taking-root/1-01/',
        lastPageUrl: 'https://twigserial.wordpress.com/category/story/epilogue-arc-forest-for-the-trees/e-04/',
        typos: typos[TWIG],
    },
    [PALE]: {
        firstPageUrl: 'https://palewebserial.wordpress.com/2020/05/05/blood-run-cold-0-0/',
        lastPageUrl: '',
        typos: typos[PALE],
    },
};

module.exports = environment;