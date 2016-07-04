'use strict';

let mongoose = require('mongoose');

module.exports = mongoose.model('Book', require('./book.schema.js'));