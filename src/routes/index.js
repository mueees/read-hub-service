'use strict';

let error = require('mue-core/modules/error');
const API_PREFIX = '/api/read-hub';

module.exports = function (app) {
    app.get(API_PREFIX + '/version', function (request, response, next) {
        response.send(1);
    });
};