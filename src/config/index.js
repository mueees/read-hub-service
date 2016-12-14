'use strict';

let config = new (require("nconf").Provider)(),
    path = require("path"),
    environment = require('../modules/environment'),
    configFile;

switch (true) {
    case environment.isDevelopment():
        configFile = 'development.json';

        break;

    case environment.isProduction():
        configFile = 'production.json';

        break;

    case environment.isTest():
        configFile = 'test.json';

        break;
}

config.file('read-hub.main', {file: path.join(__dirname, 'main.json')});
config.file('read-hub.configFile', {file: path.join(__dirname, configFile)});

module.exports = config;