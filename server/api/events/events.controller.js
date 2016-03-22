'use strict';
var _ =  require('lodash');
var path = require('path');
var event =require('./events.model');
var config = require('../../config/environment');


exports.savedata = function(req,res,next){

  var newevent = new event(req.body);

  newevent.save(function(err,user){
    if(err) return next (err);
    res.json({'status':'your data saved'});
  })
};

exports.eventlist = function(req,res,next) {

  event.find({}).select({'shortD':0,'longD':0})
    .exec(function(err,data) {
    if(err) return next(err);
    var body = {

      'status':'ok',
      data:data

    };
      res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(body);

    });
};


exports.event_details = function(req,res,next){

  event.findOne({'_id':req.params.id},  function(err,event){
    if(err) return next(err);

    if(!event)
     console.log("no such event exist");
    var body =  {
      'status':'ok',
      data :event.total_details
    };
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(body);

  })
};


