'use strict';

let Tag = require('modules/tag').Tag;

function clear() {
    return Promise.all([
        Tag.remove()
    ]);
}

exports.db = {
    clear: clear
};