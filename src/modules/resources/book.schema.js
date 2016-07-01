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

    cover: {
        type: String,
        enum: ['hard', 'soft'],
        default: 'hard'
    },

    price: {
        type: Number
    },

    publisher: {
        type: String
    },

    author: {
        type: Array,
        default: []
    },

    language: {
        type: String,
        enum: ['ru', 'ua', 'en'],
        default: 'ru'
    },

    published_data: {
        type: Date
    },

    pages: {
        type: Number
    },

    create_data: {
        type: Date,
        default: new Date()
    }

    /*related: {}, // for further implementation,
    isExist: {}, // for further implementation,
    tags: {} // for further implementation*/
});