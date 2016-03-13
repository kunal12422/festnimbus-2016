'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();
//var sendgrid  = require('sendgrid')('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');



//self
var user =require('./user.model');

router.get('/',function(req, res){
  res.json({'status': 'working!!!'});
});

 router.post('/register', controller.createUser);
//router.get('/posts', controller.showPosts);






/*
  router.post('/register',function(err,user,next){
    passport.authenticate('local-signup',function(err,user,info){
      if (err) {
        return res.end("error")
      }
      if (!user) {
        return res.status(403).json({err: info})
      }
      // rand = Math.floor((Math.random() * 100) + 54);
      host = req.get('host');
      link = "http://" + req.get('host') + "/verify/" + user.unique;
      mailOptions = {
        to: req.body.email,
        subject: "please confirm your email account",
        html: "hllo <br> pleasclick on link to verify<br> <a href=" + link + ">click here to verify</a>"

      };
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
          res.end("error");
        } else {
          console.log("Message sent: " + response.message);
          res.end("sent");
        }
      })
    }) (req,res,next);

  });


*/


router.get('/profile',auth.isAuthenticated(), controller.profile);
router.get('/make',controller.make_lead);
router.get('/show',controller.show_lead);


module.exports = router;
