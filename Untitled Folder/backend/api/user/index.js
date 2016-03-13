'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/',function(req, res){
  res.json({'status': 'working!!!'});
});

router.post('/register', controller.createUser);
//router.get('/posts', controller.showPosts);
router.get('/me',auth.isAuthenticated(), controller.me);


module.exports = router;
