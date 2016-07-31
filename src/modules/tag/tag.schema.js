'use strict';

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        required: true
    },

    description: {
        type: String,
        default: ''
    }
});