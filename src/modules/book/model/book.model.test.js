'use strict';

var expect = require('chai').expect;
var asyncCheck = require('mue-core/modules/test-helper').asyncCheck;
let config = require('../../../config');

var Book = require('./index');

describe('Base Log Model', function () {
    before(function (done) {
        require('mue-core/modules/db').initConnection({
            port: config.get('db:port'),
            name: config.get('db:name'),
            host: config.get('db:host')
        }).then(function (model) {
            done();
        });
    });

    it('should contains base methods', function () {
        expect(Book.isValid).to.be.ok;
    });

    it('should create book', function (done) {
        Book.create({
            title: 'abc'
        }).then(function (book) {
            asyncCheck(done, function () {
                expect(book).to.be.ok;
                expect(book.get('_id')).to.be.ok;
                expect(book.get('title')).to.be.ok;
            });
        });
    });
});