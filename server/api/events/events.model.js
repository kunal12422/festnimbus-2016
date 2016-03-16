'use strict';

var mongoose =require('mongoose');
var Schema =mongoose.Schema;

const getTags = function(tags){
  return tags.join(',');
};

const setTags = function(tags){
  return tags.split(',');
};

var eventschema = new Schema({
  Ename: String,
  Dname: String,
  Tname:String,
  shortD: String,
  longD: String,
  Contact: Number,
  rules:{ type: [], get: getTags, set: setTags }

});

eventschema
  .virtual('details')
  .get(function(){
  return {
    'Ename':this.Ename,
    'Dname':this.Dname
};
});


eventschema
  .virtual('total_details')
  .get(function(){
  return {
    'Ename':this.Ename,
    'Dname': this.DName,
    'shortD':this.shortD,
    'longD':this.longD,
    'Contact':this.Contact

  }
});


module.exports =mongoose.model('events',eventschema);
