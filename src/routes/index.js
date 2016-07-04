'use strict';

let error = require('mue-core/modules/error');

let onlyAdmin = require('../middlewares/only-admin');
let getUser = require('../middlewares/get-user');

let Tag = require('../modules/tag').Tag;

const API_PREFIX = '/api';
const VERSION = '1';

module.exports = function (app) {
    app.use(getUser);

    app.get(API_PREFIX + '/version', function (request, response, next) {
        response.send(VERSION);
    });

    app.get(API_PREFIX + '/tags', function (request, response, next) {
        Tag.find({}).then(function (tags) {
            response.send(tags);
        }, function () {
            next(error.getHttpError(400, 'Cannot get tags'));
        });
    });

    app.put(API_PREFIX + '/tags', function (request, response, next) {
        Tag.create(request.body).then(function (tag) {
            response.send({
                _id: tag._id
            });
        }, function () {
            next(error.getHttpError(400, 'Cannot create tag'));
        });
    });

    app.post(API_PREFIX + '/tags/:id', function (request, response, next) {
        Tag.update({
            _id: request.params.id
        }, request.body).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot update tag'));
        });
    });

    app.delete(API_PREFIX + '/tags/:id', function (request, response, next) {
        Tag.remove({
            _id: request.params.id
        }).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot remove tag'));
        });
    });

    // get books
    app.get(API_PREFIX + '/books', function (request, response, next) {
        response.send([]);
    });

    // add books
    app.put(API_PREFIX + '/books', [onlyAdmin, function (request, response, next) {
        var bookData = request.body;

        if (Book.isValid(bookData)) {
            Book.create(bookData).then(function (book) {
                response.send({
                    _id: book._id
                });
            }, function () {
                next(error.getHttpError(400, 'Cannot create book'));
            });
        } else {
            next(error.getHttpError(400, 'Invalid book data'))
        }
    }]);

    // edit books
    app.post(API_PREFIX + '/books/:id', [onlyAdmin, function (request, response, next) {
        response.send({});
    }]);

    // delete books
    app.delete(API_PREFIX + '/books:id', [onlyAdmin, function (request, response, next) {
        response.send({});
    }]);

    //  CRUD Categories
    //  CRUD Tags
};