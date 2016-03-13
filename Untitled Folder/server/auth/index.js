'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var facebookConfig = require('./config');
var User = require('../api/user/user.model');


// Passport Configuration - Local
require('./local/passport').setup(User, config);

// Passport Configuration - Facebook
//require('./facebook/passport').setup(User, facebookConfig);

var router = express.Router();

router.use('/local', require('./local'));
//router.use('/facebook', require('./facebook'));

module.exports = router;
