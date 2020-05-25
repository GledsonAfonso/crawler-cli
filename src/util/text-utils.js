const removeTyposFrom = (entry, typos) => {
    let newEntry = entry.trim();

    for (const typo in typos) {
        const correctTerm = typos[typo];

        if (typos.hasOwnProperty(typo)) {
            newEntry = newEntry.replace(RegExp(typo, 'g'), correctTerm);
        }
    }

    return newEntry;
};

module.exports = { removeTyposFrom };