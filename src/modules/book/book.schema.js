'use strict';

let mongoose = require('mongoose');

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
        enum: ['hard', 'soft'],
        default: 'hard'
    },

    // top image
    cover: {
        type: String
    },

    publisher: {
        type: String
    },

    authors: {
        type: Array,
        default: []
    },

    language: {
        type: String,
        enum: ['ru', 'ua', 'en'],
        default: 'ru'
    },

    // date when book was published by publisher
    published_data: {
        type: Date
    },

    pages: {
        type: Number
    },

    // date when book was added to DB
    create_data: {
        type: Date,
        default: new Date()
    }

    /*
     price: {type: Number},
     related: {}, // for further implementation,
     isExist: {}, // for further implementation,
     tags: {} // for further implementation*/
});