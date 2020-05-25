const { removeUnwantedTermsFrom, removeTyposFrom } = require('../../src/util/text-utils');

describe('text utils', () => {
    test('should be able to fix typos', () => {
        const entry = 'This is a sample, pleased fixs all the typus. Some tiposcanconsist in prases to';
        const typos = {
            'pleased': 'please',
            'fixs': 'fix',
            'typus': 'typos',
            'tiposcanconsist in prases to': 'typos can be consisted by phrases too.'
        };
        const expected = 'This is a sample, please fix all the typos. Some typos can be consisted by phrases too.';

        const fixedEntry = removeTyposFrom(entry, typos);

        expect(fixedEntry).toBe(expected);
    });
});