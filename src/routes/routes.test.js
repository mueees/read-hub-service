'use strict';

let config = require('config');
let expect = require('chai').expect;
let asyncCheck = require('mue-core/modules/test-helper').asyncCheck;
let Interaction = require('modules/interaction');

const API_PREFIX = '/api';

let interaction = new Interaction({
    baseUrl: 'http://localhost:' + config.get('network:port')
});

describe('Routes', function () {
    it('should return version', function (done) {
        interaction.request({
            url: API_PREFIX + '/version'
        }).then(function (response) {
            asyncCheck(done, function () {
                expect(response.body).to.be.equal('1');
            });
        }, function () {
            done(new Error('Cannot execute request'));
        });
    });

    it('should return all tags', function (done) {
        interaction.request({
            url: API_PREFIX + '/tags'
        }).then(function (response) {
            asyncCheck(done, function () {
                expect(response.body).to.be.equal('[]');
            });
        }, function () {
            done(new Error('Cannot execute request'));
        });
    });
});