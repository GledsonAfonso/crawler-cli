const removeMultipleWhiteSpaces = (entry) => {
    let result = entry.replace(RegExp('\\s\\s+', 'g'), ' ');
    result = entry.replaceAll('&nbsp;', '');

    return result;
};

const removeTyposFrom = (entry, typos) => {
    let newEntry = entry.trim();

    for (const typo in typos) {
        const correctTerm = typos[typo];

        if (typos.hasOwnProperty(typo)) {
            if (typo.includes('regex:')) {
                const typoRegex = typo.replace('regex:', '');
                newEntry = newEntry.replace(RegExp(typoRegex, 'gi'), correctTerm);
            } else {
                newEntry = newEntry.replace(typo, correctTerm);
            }
        }
    }

    return newEntry;
};

module.exports = { removeMultipleWhiteSpaces, removeTyposFrom };