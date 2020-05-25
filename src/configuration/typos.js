const { WORM, WARD, PACT, TWIG, PALE } = require('../model/book');

const typos = {
    [WORM]: {
        "dribblesrunning": "dribbles running",
        ",I": ", I"
    },
    [WARD]: {},
    [PACT]: {},
    [TWIG]: {},
    [PALE]: {},
};

module.exports = typos;