'use strict';

let Book = require('../resources/book.resource');

function create(data){
    return Book.create(data);
}

function isValid(){
    return true;
}

exports.create = create;
exports.isValid = isValid;