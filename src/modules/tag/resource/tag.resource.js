'use strict';

let mongoose = require('mongoose');

module.exports = mongoose.model('Tag', require('./tag.schema.js'));