const removeMultipleWhiteSpaces = (entry) => entry.replace(RegExp('\\s\\s+', 'g'), ' ');

const removeTyposFrom = (entry, typos) => {
    let newEntry = entry.trim();

    for (const typo in typos) {
        const correctTerm = typos[typo];

        if (typos.hasOwnProperty(typo)) {
            newEntry = newEntry.replace(typo, correctTerm);
        }
    }

    return newEntry;
};

module.exports = { removeMultipleWhiteSpaces, removeTyposFrom };