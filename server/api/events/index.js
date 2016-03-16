var express = require('express');
var controller = require('./events.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

var event = require('./events.model.js');



//router.get('/team/:team', controller.team_events);
//router.get('/team/:team/:event', controller.team_event_details);

router.post('/save',controller.savedata);
router.get('/eventlist',auth.isAuthenticated(),controller.eventlist);
router.get('/event/:id',auth.isAuthenticated(),controller.event_details);

/**
 * WEB ROUTES
 */


module.exports =router;
