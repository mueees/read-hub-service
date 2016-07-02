'use strict';

let error = require('mue-core/modules/error');

let onlyAdmin = require('../middlewares/only-admin');
let getUser = require('../middlewares/get-user');

let Book = require('../modules/book').Book;

const API_PREFIX = '/api/read-hub';
const VERSION = '1';

module.exports = function (app) {
    app.use(getUser);

    app.get(API_PREFIX + '/version', function (request, response, next) {
        response.send(VERSION);
    });

    // get books
    app.get(API_PREFIX + '/books', function (request, response, next) {
        response.send([]);
    });

    // add books
    app.put(API_PREFIX + '/books', [onlyAdmin, function (request, response, next) {
        var bookData = request.body;

        if(Book.isValid(bookData)){
            Book.create(bookData).then(function (book) {
                response.send({
                    _id: book._id
                });
            }, function () {
                next(error.getHttpError(400, 'Cannot create book'));
            });
        }else{
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