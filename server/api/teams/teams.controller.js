var team = require('./teams.model.js');
var event = require('../events/events.model.js');

/**
 * sending back details of /:team with [events]
 * @param req
 * @param res
 */
exports.team_details = function(req, res){

  team.find({'teamName': req.params.team}, function(err, data){


    res.setHeader('Cache-Control', 'public, max-age=7200');
    res.json({
      'data': data,
      'status':'Events Received of requested team'
    });

  });

};


exports.create_details = function(req, res){
  var newTeam = new team(req.body);
  newTeam.save(function(err, team){
    res.json({
      'data':team,
      'status':'Success!'
    });
  });
};

/**
 * Retrons deatils(shorD, longD,rules etc) of an event
 * @param req
 * @param res
 */

exports.team_event_details = function(req, res){

  res.setHeader('Cache-Control', 'public, max-age=7200');
  event.find({'Ename': req.params.event}, function(err, event){


    res.json({
      'data':event,
      'status':'Success!'
    })
  });

};
