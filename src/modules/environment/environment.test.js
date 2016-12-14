'use strict';

let expect = require('chai').expect;
let env = require('./index');

describe('Environment Module', function () {
    it('should exist base methods', function () {
        expect(env.isProduction).to.be.ok;
        expect(env.isDevelopment).to.be.ok;
        expect(env.isTest).to.be.ok;
    });
});