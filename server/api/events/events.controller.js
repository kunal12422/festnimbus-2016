'use strict';
var _ = require('lodash');
var path = require('path');
var event = require('./events.model');
var config = require('../../config/environment');


exports.savedata = function (req, res, next) {

  var newevent = new event(req.body);

  newevent.save(function (err, user) {
    if (err) return next(err);
    res.json({'status': 'Saved!'});
  })
};

exports.save_members_data = function (req, res) {
  var team = req.params.team;
  console.log(req.body.year + '===============>>>' + req.body.members);
  event.update({'Tname': team}, {$push: { 'team_members.members':req.body.members},'team_members.year':req.body.year},
  {
    safe: true, upsert: true
  }, function (err, update) {

    res.json({
      'data': update
    })
  } );

};
