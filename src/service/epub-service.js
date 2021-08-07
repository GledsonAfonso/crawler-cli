const fs = require('fs');
const Epub = require('epub-gen');

const rootPath = process.cwd();
const EPUB_DIRECTORY = `${rootPath}/epub`;

const _getContent = (pages) => {
    const content = pages.map(page => {
        const contentItem = {
            title: page.title,
            data: page.entry
        };
    
        return contentItem;
    });

    return content;
};

const getEpubDirectory = () => EPUB_DIRECTORY;

const generateEpub = (title, author, pages) => {
    if (!fs.existsSync(EPUB_DIRECTORY)) {
        fs.mkdirSync(EPUB_DIRECTORY);
    }
    
    const output = `${EPUB_DIRECTORY}/${title}.epub`;
    const content = _getContent(pages);
    const options = {
        title,
        author,
        output,
        content
    };

    return new Epub(options).promise;
};

module.exports = { getEpubDirectory, generateEpub };