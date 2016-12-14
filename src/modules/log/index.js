'use strict';

let env = require('../environment');

class Logger {
    constructor(module) {
        this.module = module;
        this.pathModule = module.filename.split("/").slice(-2).join('/');
    }

    error(message) {
        console.error(message);
    }

    info(message) {
        console.info(message);
    }

    // only should be visible on development mode
    debug(message) {
        if (env.isDevelopment()) {
            console.log(message);
        }
    }

    warning(message) {
        console.warn(message);
    }
}

// pass module instance to Logger for further manipulation
module.exports = function (module) {
    return new Logger(module);
};