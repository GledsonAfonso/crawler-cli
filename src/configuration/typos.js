const { Book } = require('../model/book');

const typos = {
    [Book.WORM]: {
        "dribblesrunning": "dribbles running",
        ",I": ", I"
    },
    [Book.WARD]: {
        "regex:<a(.*)email-protection(.*)a>": "Point_Me_@",
        "regex:Glitzglam:(\\s+)<\/strong>": "Glitzglam:<\/strong>",
        "I agree for the most part, Point_Me_@": "I agree for the most part, Point@"
    },
    [Book.PACT]: {},
    [Book.TWIG]: {},
    [Book.PALE]: {},
};

module.exports = typos;