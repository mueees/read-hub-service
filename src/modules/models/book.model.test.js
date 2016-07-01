var chai = require('chai');
var expect = chai.expect;
var asyncCheck = require('mue-core/modules/test-helper').asyncCheck;

var bookModel = require('./book.model');

describe('Base Log Model', function () {
    it('should contains base methods', function () {
        expect(bookModel.isValid).to.be.ok;
        expect(bookModel.create).to.be.ok;
    });
});