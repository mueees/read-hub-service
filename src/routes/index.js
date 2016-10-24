'use strict';

let _ = require('lodash');

let error = require('mue-core/modules/error');

let onlyAdmin = require('../middlewares/only-admin');
let getUser = require('../middlewares/get-user');

let Tag = require('../modules/tag').Tag;
let Book = require('../modules/book').Book;
let BookManager = require('../modules/book').BookManager;
let Category = require('../modules/category').Category;
let CategoryManager = require('../modules/category').CategoryManager;
let OrderManager = require('../modules/order/index').OrderManager;

const API_PREFIX = '/api';
const VERSION = '1';

module.exports = function (app) {
    app.use(getUser);

    app.get(API_PREFIX + '/version', function (request, response, next) {
        response.send(VERSION);
    });

    // Tags
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
        Promise.all([
            Tag.remove({_id: request.params.id}),
            BookManager.removeTag(request.params.id)
        ]).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot remove tag'));
        });
    });

    // Category
    app.get(API_PREFIX + '/categories', function (request, response, next) {
        Category.find({}).then(function (categories) {
            response.send(categories);
        }, function () {
            next(error.getHttpError(400, 'Cannot get categories'));
        });
    });

    app.put(API_PREFIX + '/categories', function (request, response, next) {
        Category.create(request.body).then(function (category) {
            response.send({
                _id: category._id
            });
        }, function () {
            next(error.getHttpError(400, 'Cannot create category'));
        });
    });

    app.post(API_PREFIX + '/categories/:id', function (request, response, next) {
        CategoryManager.update({
            _id: request.params.id
        }, request.body).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot update category'));
        });
    });

    // delete category
    app.delete(API_PREFIX + '/categories/:id', function (request, response, next) {
        BookManager.getBooksByCategoryIdDeep(request.params.id).then(function (books) {
            if (books.length) {
                let bookTitles = _.map(books, 'title');
                let bookIds = _.map(books, '_id');

                next(error.getHttpError(400,
                    bookTitles.join(', ') + ' books contains that or child categories',
                    bookIds));
            } else {
                Promise.all([
                    CategoryManager.remove(request.params.id)
                ]).then(function () {
                    response.send();
                }, function () {
                    next(error.getHttpError(400, 'Cannot remove category'));
                });
            }
        });
    });

    // Books
    app.get(API_PREFIX + '/books', function (request, response, next) {
        Book.find({}).then(function (books) {
            response.send(books);
        }, function () {
            next(error.getHttpError(400, 'Cannot get books'));
        });
    });

    // create book
    app.post(API_PREFIX + '/books', [onlyAdmin, function (request, response, next) {
        let book = request.body;

        book.createDate = new Date();

        Book.create(request.body).then(function (book) {
            response.send({
                _id: book._id
            });
        }, function () {
            next(error.getHttpError(400, 'Cannot create book'));
        });
    }]);

    // edit book
    app.put(API_PREFIX + '/books/:id', [onlyAdmin, function (request, response, next) {
        let book = request.body;

        delete book.createDate;

        Book.update({
            _id: request.params.id
        }, book).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot update book'));
        });
    }]);

    // delete books
    app.delete(API_PREFIX + '/books/:id', [onlyAdmin, function (request, response, next) {
        Book.remove({
            _id: request.params.id
        }).then(function () {
            response.send();
        }, function () {
            next(error.getHttpError(400, 'Cannot remove book'));
        });
    }]);

    // Orders
    // return all book orders
    app.get(API_PREFIX + '/orders', [onlyAdmin, function (request, response, next) {
        OrderManager.find({}).then(function (orders) {
            response.send(orders);
        }, function () {
            next(error.getHttpError(400, 'Cannot get orders'));
        });
    }]);

    // create order
    app.post(API_PREFIX + '/order', function (request, response, next) {
        OrderManager.create(request.body).then(function (order) {
            response.send(order);

            // send response to user
            // send email to user
            // send email to admin email
        });
    });
};