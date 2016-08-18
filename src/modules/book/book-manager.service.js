'use strict';

let Book = require('./book.resource');

function removeCategory(categoryId) {
    return new Promise(function (resolve) {
        resolve();
    });
}

function removeTag(tagId) {
    return Book.update(
        {},
        {
            $pull: {
                tags: {
                    $in: [tagId]
                }
            }
        },
        {
            multi: true
        }
    );
}

function getBooksByCategoryId() {
    return new Promise(function (resolve) {
        resolve([]);
    });
}

module.exports = {
    getBooksByCategoryId: getBooksByCategoryId,
    removeCategory: removeCategory,
    removeTag: removeTag
};