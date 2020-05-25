const typos = require('./typos');
const { WORM, WARD, PACT, TWIG, PALE } = require('../model/book');

const environment = {
    [WORM]: {
        url: 'https://parahumans.wordpress.com',
        startUri: '/category/stories-arcs-1-10/arc-1-gestation/1-01/',
        typos: typos[WORM],
    },
    [WARD]: {
        url: 'https://www.parahumans.net',
        startUri: '/2017/10/21/glow-worm-0-1/',
        typos: typos[WARD],
    },
    [PACT]: {
        url: 'https://pactwebserial.wordpress.com',
        startUri: '/2013/12/17/bonds-1-1/',
        typos: typos[PACT],
    },
    [TWIG]: {
        url: 'https://twigserial.wordpress.com',
        startUri: '/category/story/arc-1-taking-root/1-01/',
        typos: typos[TWIG],
    },
    [PALE]: {
        url: 'https://palewebserial.wordpress.com',
        startUri: '/2020/05/05/blood-run-cold-0-0/',
        typos: typos[PALE],
    },
};

module.exports = environment;