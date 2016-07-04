'use strict';

let Tag = require('modules/tag').Tag;
let Category = require('modules/category').Category;

function clear() {
    return Promise.all([
        Tag.remove(),
        Category.remove()
    ]);
}

exports.db = {
    clear: clear
};