'use strict';
var _ =  require('lodash');
var path = require('path');
var event =require('./events.model');
var config = require('../../config/environment');


exports.savedata= function(req,res,next){
  var newevent = new event(req.body);
  newevent.save(function(err,user){
    if(err) return next (err);
    res.json({'status':'your data saved'});
  })
};

exports.eventlist=function(req,res,next) {
  var body = {event: event.details};
  res.json(body);
  next();
};

exports.event_details =function(req,res,next){
  var body ={event :event.total_details};
  res.json(body);
}
