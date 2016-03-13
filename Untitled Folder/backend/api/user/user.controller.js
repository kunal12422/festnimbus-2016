'use strict';
var _ =  require('lodash');
var path = require('path');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

exports.index = function(req, res){


  User.find({}, '-salt -hashedPassword', function(err, users){
    if(err) return res.status(500).send({'err': err});

    res.status(200).json(users);
  });

};




exports.createUser = function(req, res, next){
  User.find({'email': req.body.email}, function(err, user){
    if(user.length)  {
      res.json({'message': 'user\'s email already exist'});
    }else {
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.save(function(err, user){
        if(err) return next(err);
        var token = jwt.sign({_id: user._id}, process.env.SESSION_SECRET, { expiresIn: 2592000 });

        res.json({
          status:'user created!',
          data: token
        });
        //store userId on request for next middleware
        res.userId = user._id;
        next();
      });
    }

  });

};



exports.me = function(req, res, next){
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);

    var body = {
      status: 'OK',
      data:user.profile
    };
    res.json(body);
  })
};
