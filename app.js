// *** main dependencies *** //
var app = require('express')();
var bodyParser = require('body-parser');
var logs   = require('./modules/logger');
var cors = require('cors');
var server = require('http').Server(app);

// *** Modules *** //
var opparser = require('./modules/ogParser');

// *** config middleware *** //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// *** Routers *** //
app.post('/urlForScraping', [opparser.opParser]);

// *** server config *** //
server.listen(3999, function () {
    logger.info('Node server running on http://localhost:3999/');
});

module.exports = server
