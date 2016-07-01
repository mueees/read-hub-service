'use strict';

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },

    description: {
        type: String,
        default: ''
    },

    cover: {
        require: true,
        type: String,
        enum: ['hard', 'soft']
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
        require: true,
        type: String,
        enum: ['ru', 'ua', 'en']
    },

    published_data: {
        type: Date
    },

    pages: {
        type: Number
    },

    create_data: {
        require: true,
        type: Date,
        default: new Date()
    }

    /*related: {}, // for further implementation,
    isExist: {}, // for further implementation,
    tags: {} // for further implementation*/
});