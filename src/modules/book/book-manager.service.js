'use strict';

let _ = require('lodash');

let Book = require('./book.resource');
let CategoryManager = require('../category').CategoryManager;

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

/**
 * Return books that belong to passed categoryId
 * or to any child of categoryId
 * */
function getBooksByCategoryIdDeep(categoryId) {
    return new Promise(function (resolve) {
        CategoryManager.getChildCategoryIds(categoryId).then(function (categoryIds) {
            categoryIds.push(categoryId);

            var bookPromises = _.map(categoryIds, function (categoryIds) {
                return getBooksByCategoryId(categoryIds);
            });

            Promise.all(bookPromises).then(function (booksArr) {
                let flattenBooks = _.flattenDeep(booksArr);
                let books = [];

                _.each(flattenBooks, function (flattenBook) {
                    var resultBook = _.find(books, function (book) {
                        return String(flattenBook._id) === String(book._id);
                    });

                    if (!resultBook) {
                        books.push(flattenBook);
                    }
                });

                resolve(books);
            });
        });
    });
}

/**
 * Return books that belong exactly to passed categoryId
 * */
function getBooksByCategoryId(categoryId) {
    return Book.find({
        categories: {
            $elemMatch: {
                _id: categoryId
            }
        }
    });
}

module.exports = {
    getBooksByCategoryIdDeep: getBooksByCategoryIdDeep,
    getBooksByCategoryId: getBooksByCategoryId,
    removeTag: removeTag
};