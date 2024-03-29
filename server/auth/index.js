'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var facebookConfig = require('./config');
var User = require('../api/user/user.model');


// Passport Configuration - Local
require('./local/passport').setup(User, config);


var router = express.Router();

router.use('/local', require('./local'));


module.exports = router;
