var express = require('express');
var controller = require('./teams.controller.js');
var auth = require('../../auth/auth.service');
var event = require('../events/events.model.js');
var team = require('./teams.model.js');


var router = express.Router();

router.get('/:team', controller.team_details);
router.post('/save', controller.create_details);
router.get('/:team/:event', controller.team_event_details);


module.exports = router;
