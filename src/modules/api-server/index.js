var http = require('http'),
    express = require('express'),
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    HttpError = require('../error').HttpError,
    log = require('../log')(module);

module.exports = function (options) {
    var app = express();

    app.use(bodyParser.json({type: 'application/json'}));

    app.use(require("../../middlewares/sendHttpError"));

    // init callback
    if (_.isFunction(options.init)) {
        options.init(app);
    }

    // error handling
    app.use(function (err, request, response, next) {
        log.error(err.message);

        if (typeof err == "number") {
            err = new HttpError(err);
        } else if (err.name === 'HttpError') {
            // TODO: Rewrite to instanceof
        } else {
            err = new HttpError(500, 'Fatal server error');
        }

        // log error to console
        log.error(err.message);

        response.sendHttpError(err);
    });

    // before start callback
    if (_.isFunction(options.beforeStart)) {
        options.beforeStart(app);
    }

    http.createServer(app).listen(options.port);

    log.info('"' + options.name + '" service listens ' + options.port + ' port.');

    return app;
};