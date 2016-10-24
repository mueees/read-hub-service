'use strict';

let mongoose = require('mongoose');

module.exports = mongoose.model('Order', require('./order.schema.js'));