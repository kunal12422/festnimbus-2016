'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();
//var sendgrid  = require('sendgrid')('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');

var mandrill = require('node-mandrill')('owQ7XSkk5JPrEEITDL9K6g');

//self
var user = require('./user.model');

//cache response of data
var apicache = require('apicache').options({ debug: true }).middleware;

router.get('/', controller.index);
router.post('/register', controller.createUser);
router.get('/profile', auth.isAuthenticated(), apicache('30 minutes'), controller.profile);
router.get('/lb', controller.leaderboard);

router.get('/test', function (req, res) {
  //send an e-mail to jim rubenstein
  mandrill('/messages/send', {
    message: {
      to: [{ email: 'sandy86sr@gmail.com', name: 'Jim Rubenstein' }],
      from_email: 'dcr@festnimbus.herokuapp.com',
      subject: "Hey, what's up?",
      text: "Hello, I sent this message using mandrill."
    }
  }, function (error, response) {
    //uh oh, there was an error
    if (error) console.log(JSON.stringify(error));

    //everything's good, lets see what mandrill said
    else console.log(response);
  });

  res.json({ 'status': 'email sent' });
});

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

module.exports = router;

//# sourceMappingURL=index-compiled.js.map