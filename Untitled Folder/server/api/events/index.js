var express = require('express');
var controller = require('./events.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

var event=require('./events.model.js');
router.post('/save',controller.savedata);
router.get('/eventlist',auth.isAuthenticated(),controller.eventlist);
router.get('/eventdetails',auth.isAuthenticated(),controller.event_details);


module.exports =router;