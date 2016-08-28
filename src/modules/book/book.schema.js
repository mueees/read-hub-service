'use strict';

let mongoose = require('mongoose');
let BOOK = require('./book.constant');

module.exports = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },

    quotes: {
        type: Array,
        default: []
    },

    binding: {
        type: String,
        enum: BOOK.bindings,
        default: BOOK.defaultBinding
    },

    // top image
    covers: {
        type: [],
        default: []
    },

    promo: {
        type: String,
        enum: BOOK.promoLabels
    },

    tags: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },

    categories: {
        type: [],
        default: []
    },

    price: {
        type: Number,
        default: 0
    },

    exist: {
        type: Boolean,
        default: false
    },

    owner: {
        type: String,
        enum: BOOK.owners
    },

    publisher: {
        type: String
    },

    isbn: {
        type: String
    },

    relatedBooks: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },

    authors: {
        type: Array,
        default: []
    },

    authorDescription: {
        type: String,
        default: ''
    },

    language: {
        type: String,
        enum: BOOK.languages,
        default: BOOK.defaultLanguage
    },

    // date when book was published by publisher
    published_data: {
        type: Date
    },

    pages: {
        type: Number
    },

    // date when book was added to DB
    createDate: {
        type: Date
    }

    /*
     related: {}, // for further implementation,
     isExist: {}, // for further implementation,
     */
});