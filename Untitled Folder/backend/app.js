/**
 * Main application file
 */

'use strict';
var express = require('express');
var mongoose = require('mongoose');
var uriUtil 	= require('mongodb-uri');
var config = require('./config/environment');
var http = require('http');




// Connect to MongoDB
var mongodbUri = 'mongodb://'+ config.mongo.host +'/' + config.mongo.databaseName;

var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));



// Setup server
var app = express();



var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
