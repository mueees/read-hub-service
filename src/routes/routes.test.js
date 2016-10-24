'use strict';

let config = require('config');
let expect = require('chai').expect;
let asyncCheck = require('mue-core/modules/test-helper').asyncCheck;
let testHelper = require('modules/test-helper');
let Interaction = require('modules/interaction');
let Db = require('modules/db');

const API_PREFIX = '/api';

const tagData = {
    name: 'Tag 1',
    description: 'Tag 1 Description'
};

const categoryData = {
    name: 'Category 1',
    description: 'Category 1 Description'
};

let interaction = new Interaction({
    baseUrl: 'http://localhost:' + config.get('network:port')
});

describe('Routes', function () {
    before(function (done) {
        Db.initConnection({
            port: config.get('db:port'),
            name: config.get('db:name'),
            host: config.get('db:host')
        }).then(function () {
            done();
        }, function () {
            done(new Error('Cannot establish connection'));
        });
    });

    beforeEach(function (done) {
        testHelper.db.clear().then(function () {
            done();
        }, function () {
            done(new Error('Cannot establish connection'));
        })
    });

    after(function (done) {
        Db.closeConnection().then(function () {
            done();
        }, function () {
            done(new Error('Cannot close Db connection'));
        });
    });

    it('should return version', function (done) {
        interaction.request({
            url: API_PREFIX + '/version'
        }).then(function (response) {
            asyncCheck(done, function () {
                expect(response).to.be.equal(1);
            });
        }, function () {
            done(new Error('Cannot execute request'));
        });
    });

    // CRUD Tag
    it('should create tag', function (done) {
        interaction.request({
            url: API_PREFIX + '/tags',
            method: 'PUT',
            data: tagData
        }).then(function (response) {
            asyncCheck(done, function () {
                expect(response._id).to.be.ok;
            });
        }, function () {
            done(new Error('Cannot execute request'));
        });
    });

    it('should update tag by id', function (done) {
        interaction.request({
            url: API_PREFIX + '/tags',
            method: 'PUT',
            data: tagData
        }).then(function (response) {
            let tagId = response._id;

            interaction.request({
                url: API_PREFIX + '/tags/' + tagId,
                method: 'POST',
                data: {
                    name: 'Tag 2'
                }
            }).then(function (response) {
                done();
            }, function (error) {
                done(new Error('Cannot execute request'));
            });
        });
    });

    it('should delete tag by id', function (done) {
        interaction.request({
            url: API_PREFIX + '/tags',
            method: 'PUT',
            data: tagData
        }).then(function (response) {
            let tagId = response._id;

            interaction.request({
                url: API_PREFIX + '/tags/' + tagId,
                method: 'DELETE'
            }).then(function (response) {
                done();
            }, function (error) {
                done(new Error('Cannot execute request'));
            });
        });
    });

    it('should return all tags', function (done) {
        Promise.all([
            interaction.request({
                url: API_PREFIX + '/tags',
                method: 'PUT',
                data: tagData
            }),
            interaction.request({
                url: API_PREFIX + '/tags',
                method: 'PUT',
                data: tagData
            })
        ]).then(function () {
            interaction.request({
                url: API_PREFIX + '/tags'
            }).then(function (response) {
                asyncCheck(done, function () {
                    expect(response.length).to.be.equal(2);
                });
            }, function () {
                done(new Error('Cannot execute request'));
            });
        })
    });

    // CRUD Category
    it('should create category', function (done) {
        interaction.request({
            url: API_PREFIX + '/categories',
            method: 'PUT',
            data: categoryData
        }).then(function (response) {
            asyncCheck(done, function () {
                expect(response._id).to.be.ok;
            });
        }, function () {
            done(new Error('Cannot execute request'));
        });
    });

    it('should update category by id', function (done) {
        interaction.request({
            url: API_PREFIX + '/categories',
            method: 'PUT',
            data: categoryData
        }).then(function (response) {
            let categoryId = response._id;

            interaction.request({
                url: API_PREFIX + '/tags/' + categoryId,
                method: 'POST',
                data: {
                    name: 'Category 2'
                }
            }).then(function () {
                done();
            }, function () {
                done(new Error('Cannot execute request'));
            });
        });
    });

    it('should delete category by id', function (done) {
        interaction.request({
            url: API_PREFIX + '/categories',
            method: 'PUT',
            data: categoryData
        }).then(function (response) {
            let categoryId = response._id;

            interaction.request({
                url: API_PREFIX + '/categories/' + categoryId,
                method: 'DELETE'
            }).then(function () {
                done();
            }, function () {
                done(new Error('Cannot execute request'));
            });
        });
    });

    it('should return all categories', function (done) {
        Promise.all([
            interaction.request({
                url: API_PREFIX + '/categories',
                method: 'PUT',
                data: categoryData
            }),
            interaction.request({
                url: API_PREFIX + '/categories',
                method: 'PUT',
                data: categoryData
            })
        ]).then(function () {
            interaction.request({
                url: API_PREFIX + '/categories'
            }).then(function (response) {
                asyncCheck(done, function () {
                    expect(response.length).to.be.equal(2);
                });
            }, function () {
                done(new Error('Cannot execute request'));
            });
        })
    });
});