'use strict';

let http = require("http"),
    util = require("util");

function HttpError(status, message, data) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.data = data || {};
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);

HttpError.prototype.name = "HttpError";

module.exports = HttpError;