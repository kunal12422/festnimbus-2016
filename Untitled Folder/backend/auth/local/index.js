'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

//defines '/auth/local' route
router.post('/', function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.send(401).json(error);
    if (!user) return res.send(404).json({message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user._id, user.role);
    res.json({
      status:'Login successful!',
      data: token});
  })(req, res, next)
});

module.exports = router;

