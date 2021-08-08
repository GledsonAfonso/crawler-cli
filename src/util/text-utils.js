const removeMultipleWhiteSpaces = (entry) => {
    let result = entry.replaceAll('&nbsp;', ' ');
    result = result.replaceAll(RegExp('\\s\\s+', 'g'), ' ');

    return result;
};

const removeTyposFrom = (entry, typos) => {
    let newEntry = entry.trim();

    for (const typo in typos) {
        const correctTerm = typos[typo];

        if (typos.hasOwnProperty(typo)) {
            if (typo.includes('regex:')) {
                const typoRegex = typo.replace('regex:', '');
                newEntry = newEntry.replaceAll(RegExp(typoRegex, 'gi'), correctTerm);
            } else {
                newEntry = newEntry.replaceAll(typo, correctTerm);
            }
        }
    }

    return newEntry;
};

module.exports = { removeMultipleWhiteSpaces, removeTyposFrom };