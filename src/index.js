'use strict';

/*RUN STAGE*/
let config = require('config');
let apiServer = require('./modules/api-server');

// start api server
apiServer({
    name: config.get('name'),
    port: config.get('network:port'),

    init: function (app) {
        // initialize routes
        require('./routes')(app);
    }
});

// connect to DB
require('./modules/db').initConnection({
    port: config.get('db:port'),
    name: config.get('db:name'),
    host: config.get('db:host')
});