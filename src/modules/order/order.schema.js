'use strict';

let mongoose = require('mongoose');
let ORDER = require('./order.constant');

module.exports = new mongoose.Schema({
    createDate: {
        type: Date
    },

    orderId: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: ORDER.type
    },

    startOrderDate: {
        type: Date
    },

    endOrderDate: {
        type: Date
    },

    books: {
        type: [mongoose.Schema.ObjectId],
        required: true
    }
});