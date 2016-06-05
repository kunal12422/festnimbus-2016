var express = require('express');
var controller = require('./events.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

var event = require('./events.model.js');




router.post('/save',controller.savedata);


/**
 * WEB ROUTES
 */


module.exports =router;
