'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();


// local login routes

//defines '/auth/local' route
router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;

    if (!user) return res.status(404).json({'data': 'Oops!Your credentials are wrong!'});

    var token = auth.signToken(user._id, user.role);
    res.json({
      'status':'Successfully Login!',
      'data': token
    });

  })(req, res, next)
});

module.exports = router;

