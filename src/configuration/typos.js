const { WORM, WARD, PACT, TWIG, PALE } = require('../model/book');

const typos = {
    [WORM]: {
        "dribblesrunning": "dribbles running",
        ",I": ", I"
    },
    [WARD]: {
        "regex:<a(.*)email-protection(.*)a>": "Point_Me_@",
        "regex:Glitzglam:(\\s+)<\/strong>": "Glitzglam:<\/strong>",
        "I agree for the most part, Point_Me_@": "I agree for the most part, Point@"
    },
    [PACT]: {},
    [TWIG]: {},
    [PALE]: {},
};

module.exports = typos;