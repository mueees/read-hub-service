'use strict';

let expect = require('chai').expect;
let log = require('./index')(module);

describe('Log Module', function () {

    it('should exist base methods', function () {
        expect(log.error).to.be.ok;
        expect(log.info).to.be.ok;
        expect(log.warning).to.be.ok;
        expect(log.debug).to.be.ok;
    });
});