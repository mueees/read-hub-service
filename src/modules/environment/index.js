'use strict';

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const TEST = 'test';

let ENV = process.env.NODE_ENV || PRODUCTION;

exports.isProduction = function () {
    return ENV === PRODUCTION;
};

exports.isDevelopment = function () {
    return ENV === DEVELOPMENT;
};

exports.isTest = function () {
    return ENV === TEST;
};