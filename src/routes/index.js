'use strict';

let error = require('mue-core/modules/error');
const API_PREFIX = '/api/read-hub';
const VERSION = '1';

module.exports = function (app) {
    app.get(API_PREFIX + '/version', function (request, response, next) {
        response.send(VERSION);
    });
};