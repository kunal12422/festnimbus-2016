'use strict';
var _ = require('lodash');
var path = require('path');
var uuid = require('node-uuid');

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var sendgrid = require('sendgrid')('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');
var bhram = require('../bhram/bhram.model');

exports.index = function (req, res) {
  res.json({
    'status': 'OK',
    'data': 'working'
  });

};

exports.update_admin_status = function (req, res) {

  User.update({},{'isAdmin': false},{multi: true},function (err, docsAffected) {
    if (err) {
      console.log(err);
      return false;
    }
    console.log('updated with user_admin_status', docsAffected);
      res.json({
        'data':'Modified isAdmin',
        'status':'success'
      });

  });

};

exports.createUser = function (req, res) {

  User.find({'email': req.body.email}, function (err, user) {

    if (user.length) {

      res.json({
        'data': 'Users\' email already exist',
        'status': 'Access Denied'
      });

    } else {
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.unique = uuid.v4();
      newUser.save(function (err, user) {
        // console.log(process.env.SESSION_SECRET);
        if (err){
          console.log(err);
          return;
        }

        var link = "http://festnimbus.com/api/user/verify/" + user.unique;

        sendgrid.send({
          to: req.body.email,
          from: 'noreply@festnimbus.com',
          subject: 'Festnimbus Account Verification',
          html: 'Please click here to verify<br> <a href="' + link + '">Click here</a>'
        }, function (err, json) {
          if (err) {
            return console.error(err);
          }
          console.log(json);
        });
        res.json({

          'data': 'Verify your email to login!',
          'status': 'user_created'
        });

        //store userId on request for next middleware
        // res.userId = user._id;


      });
    }

  });

};


exports.profile = function (req, res, next) {


  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't give out the password or salt
    if (err) return next(err);
    if (!user) return res.send(401).json({
      'data': 'User not found',
      'status': 'Failed!'
    });

    var body = {
      'status': 'User Profile Info',
      'data': user.profile
    };


    res.json(body);

  })
};


exports.gleaderboard = function (req, res) {

  User.find({'verified': true})
    .sort({"gold_coins": -1})
    .select({'salt': 0, 'hashedPassword': 0, '_id': 0, 'unique': 0, 'verified': 0, '_v': 0, 'profile': 0})
    .exec(function (err, User) {
      if (err){
        console.log(err);
        return;
      }
      var body = {
        'data': User,
        'status': 'GOLD'
      };

      res.json(body);

    });
};


exports.sleaderboard = function (req, res) {
  User.find({'verified': true})
    .sort({"silver_coins": -1})
    .select({'salt': 0, 'hashedPassword': 0, '_id': 0, 'unique': 0, 'verified': 0, '_v': 0})
    .exec(function (err, User) {
      if (err){
        console.log(err);
        return;
      }

      var body = {
        'data': User,
        'status': 'SILVER'
      };

      res.json(body);
    });
};

exports.update_event_list = function (req, res) {
  var userId = req.user._id;
  var eventName = req.params.event;

  User.findOne({'_id': userId}, function (err, user) {

    if (_.contains(user.events_register, eventName)) {

      User.findByIdAndUpdate(
        {'_id': userId},
        {$pull: {'events_register': eventName}},
        function (err, user) {
          if (err) throw(err);

          res.json({
            'status': 'Successfully Unregistered!',
            'validity': 0
          });

        }
      );

    } else {
      User.findByIdAndUpdate(
        {'_id': userId},

        {$push: {events_register: eventName}},

        {safe: true, upsert: true}, function (err, user) {

          if (err) throw(err);

          res.json({
            'status': 'Successfully Registered!',
            'validity': 1
          });

        });
    }

  });


};

exports.verify = function (req, res) {

  User.findOne({'unique': req.params.rand}, function (err, user) {

    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      console.log('No user');
      return;
    }

    user.verified = true;
    user.unique = null;
    user.save(function (err) {
      if (err)  throw(err);
      res.send('Verified!!');
      // res.redirect('http://www.festnimbus.com');
    })

  });

};


exports.sendemail = function (req, res) {

  User.find({'email': req.body.email}, function (err, user) {

    var id = user._id;
  });
  var link = "http://festnimbus.com/api/user/reset/" + id;

  sendgrid.send({
    to: req.body.email,
    from: 'noreply@festnimbus.com',
    subject: 'Festnimbus Password reset',
    html: 'Please click here to reset password<br> <a href="' + link + '">Click here</a>'
  }, function (err, json) {
    if (err) {
      return console.error(err);
    }
    res.json({
      'status': 'ok',
      'data': 'Check your inbox'
    });
  });

};

exports.update_coins = function (req, res) {


var userId = req.user._id;

  //var e = req.body.emails;
  var roll = req.body.rollno;
  var gold = req.body.gold || 0;
  var silver = req.body.silver || 0;


 // var emails = e.split(';');

var rollnos = roll.split(';');


  User.find({'_id':userId}, function (err, user) {


      if(user[0].isAdmin){
       //updated coins of DBs

        User.update({'rollno':{$in:rollnos}},{ $inc: { 'gold_coins' : gold,'silver_coins': silver } },{multi: true}, function (err, users) {

          res.json({
            'data': 'Successfully Modified ' + users.nModified + ' record(s)',
            'status':'updated_database'
          })

        })

      }else{
        res.json({
          'data':'No Admin Privileges',
          'status':'Abort!'
        })
      }
  });

};

