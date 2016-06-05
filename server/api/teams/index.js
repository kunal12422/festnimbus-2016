var express = require('express');
var controller = require('./teams.controller.js');
var auth = require('../../auth/auth.service');
var event = require('../events/events.model.js');
var team = require('./teams.model.js');
//cache response of data
var apicache = require('apicache').options({debug:true}).middleware;

var router = express.Router();

router.get('/:team', apicache('30 minutes'), controller.team_details);
router.post('/save', controller.create_details);
router.get('/:team/:event', apicache('30 minutes'), controller.team_event_details);


module.exports = router;
