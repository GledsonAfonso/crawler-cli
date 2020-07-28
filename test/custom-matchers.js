const { matcherHint, printReceived, printExpected } = require('jest-matcher-utils');
const diff = require('jest-diff').default;

const replaceWhitespace = string => string.replace(RegExp('\\s+', 'g'), ' ').trim();
const compressWhitespace = array => array.map(replaceWhitespace);

const name = 'toMatchIgnoringWhitespaces';

expect.extend({
    toMatchIgnoringWhitespaces(received, expected) {
        const [
            receivedWithCompresssedWhitespace,
            expectedWithCompresssedWhitespace
        ] = compressWhitespace([received, expected]);
        let pass = receivedWithCompresssedWhitespace === expectedWithCompresssedWhitespace;

        let message;

        if (pass) {
            message = 'Strings match!';
        } else {
            const diffString = diff(expectedWithCompresssedWhitespace, receivedWithCompresssedWhitespace);

            message =
            `${matcherHint(`.${name}`)}\n
            Expected value:
            ${printExpected(expectedWithCompresssedWhitespace)}
            Received value:
            ${printReceived(receivedWithCompresssedWhitespace)}\n
            ${diffString ? `Difference:\n\n${diffString}` : ``}`;
        }

        return {
            pass,
            message: () => message,
        };
    },
});