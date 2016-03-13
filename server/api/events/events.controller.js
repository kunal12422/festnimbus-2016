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
      data:data};
      res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(body);

    });
};


exports.event_details =function(req,res,next){
  event.findOne({'_id':req.params.id},function(err,event){
    if(err) return next(err);
    if(!event)
    console.log("no such event exist");
    var body={
      'status':'ok',
      data :event.total_details};
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.json(body);

  })
};






exports.team_events = function(req, res, next){

console.log('So you want to get ' + req.params.team + ' events list huh?');
  if(req.params.team === 'design'){
    res.json({
      'team_events':{
        team:'Design',
        events: [
          'KAI PO CHE',
          'MODEL MAKING',
          'PAPER CRAFT',
          'MICRO ART',
          'TEMPLE RUN',
          'CHEMIQUEST 2.0',
          'JACK IT UP',
          'HIT ME IF U CAN',
          'FUTSAL',
          'hokas',
          'HADAD',
          'QDODAD',
          'OIPPII',
          'BCHNAMDKAD',
          'ADADADDdd',
          'ALLDAODAD'

        ]
      }
    })
  }


  if(req.params.team === 'hermatica'){
    res.json({
      'team_events': {
        team: 'Hermatica',
        'events': [
          'CHEMIQUEST 2.0',
          'JACK IT UP',
          'HIT ME IF U CAN',
          'FUTSAL'
        ]
      }
    })
  }

};


exports.team_event_details = function(req, res){
  res.json({
    'data':'Here we get data',
    'contact':'You can contact me',
    'rules':'Rules will be defined here'
  })
};
