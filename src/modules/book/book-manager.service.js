'use strict';

let Book = require('./book.resource');

function removeCategory(categoryId) {
    return new Promise(function (resolve) {
        resolve();
    });
}

module.exports = {
    removeCategory: removeCategory
};