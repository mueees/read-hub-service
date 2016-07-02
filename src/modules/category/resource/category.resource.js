'use strict';

let mongoose = require('mongoose');

module.exports = mongoose.model('Category', require('./category.schema.js'));