const Epub = require('epub-gen');

const EPUB_DIRECTORY = 'epub';

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

const generateEpub = async (title, author, pages) => {
    const bookInfo = {
        title,
        author,
        content: _getContent(pages)
    };

    new Epub(bookInfo, EPUB_DIRECTORY,
        () => console.log(`${title} epub create with success!`),
        (error) => console.error(`Error while trying to create epub for ${title}. Error message: `, error)
    );
};

module.exports = { generateEpub };