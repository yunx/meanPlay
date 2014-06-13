'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    logger = require('mean-logger');

var http = require('http');
var socketIo = require('socket.io');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Initializing system variables
var config = require('./server/config/config');
var db = mongoose.connect(config.db);

// Bootstrap Models, Dependencies, Routes and the app as an express app
var app = require('./server/config/system/bootstrap')(db);

// initiate socket io before listen to port
var server = http.Server(app);
var io = socketIo(server);
app.socketIo = io;

// Start the app by listening on <port>, optional hostname
server.listen(config.port, config.hostname);
console.log('Mean app started on port ' + config.port + ' (' + process.env.NODE_ENV + ')');

// Initializing logger
logger.init(app, {}, mongoose);

// Expose app
exports = module.exports = app;
