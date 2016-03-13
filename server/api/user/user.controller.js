'use strict';
var _ =  require('lodash');
var path = require('path');
var uuid =require('node-uuid');

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
//var nodemailer = require('nodemailer');
//var sgTransport = require('nodemailer-sendgrid-transport');
//var set = require('Set');
//var redis = require("redis");
 //var lb =require("redis-leaderboard");
//var lb =require('leaderboard');

//arr = new Array(10000);
//count = new Array(10000);
//never = new Array(10000);



exports.index = function(req, res){
  res.json({
	  'status': 'OK',
            'data':'working'
  });

};


/*
var host,link,mailOptions;
var smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "dcrboy7@gmail.com",
    pass: "icanmakeit"
  }
});
*/
/*
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'sandydcr',
    pass: 'lov.A123'
  }
});
*/



  exports.createUser = function(req, res, next){
	  
  User.find({'email': req.body.email}, function(err, user){
	  console.log(req.body);
    if(user.length)  {
      res.json({'message': 'users email already exist'});
    }else {
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.unique=uuid.v4();
      newUser.save(function(err, user){
       // console.log(process.env.SESSION_SECRET);
        if(err) return next(err);
       // var token = jwt.sign({_id: user._id},'sandy', { expiresIn: 1200 });

        res.json({
			'status': 'User Created',
           'data':'Registered Successfully'
           });
        //store userId on request for next middleware
        res.userId = user._id;
        console.log('dcr');
        next();
      });
    }

  });

};



exports.profile = function(req, res, next){
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);

    var body = {
      'status':'ok',
      data:user.profile 
      };
    res.setHeader('Cache-Control', 'public, max-age=86400');
  
    res.json(body);
  })
};









exports.leaderboard= function(req,res,next){
  User.find({})
    .sort({ "gold_coins": -1 })
    .select({'salt': 0,'hashedPassword':0,'_id':0,'unique':0,'verified':0,'_v':0})
    .exec(function(err,User) {
    if (err) return next(err);
    var body ={
		data:User
		};

    res.json(body);
  });
};





/*
exports.make_array = function(req,res,next){
  user.find({},function(err,query){
    for (var i=0; i<arr.length;i++)
      arr[i]=0;
    for( i=0;i<never.length;i++)
      never[i]=0;
     i=0;

    query.forEach(function(d){
       arr[i] = d.gold_coins;
      if(count[d.gold_coins]==0){
        never[d.gold_coins]= d.email;
        count[d.gold_coins]++;
      }
      else
      {

      }

      i++;
    })
  })
};
*/



