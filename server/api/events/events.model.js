'use strict';

var mongoose =require('mongoose');
var Schema =mongoose.Schema;

const getTags = function(tags){
  return tags.join(';');
};

const setTags = function(tags){
  return tags.split(';');
};


var eventschema = new Schema({
  Ename: String,
  Dname: String,
  Tname:String,
  shortD: String,
  longD: String,
  Contact: Number,
  rules:{ type: [], get: getTags, set: setTags },
  link: String

});



module.exports =mongoose.model('events',eventschema);
