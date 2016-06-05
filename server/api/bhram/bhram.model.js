'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../user/user.model');

const getTags = function (tags) {
  return tags.join(';');
};

const setTags = function (tags) {
  return tags.split(';');
};


var bhramSchema = new Schema({

  question: {type: [], get: getTags, set: setTags},
  hints: {type: [], get: getTags, set: setTags},
  answer: String,
  level: String,
  index: Number,
  rules: {type: [], get: getTags, set: setTags}

});


module.exports = mongoose.model('Bhram', bhramSchema);
