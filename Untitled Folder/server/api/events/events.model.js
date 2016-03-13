'use strict'

var mongoose =require('mongoose');
var Schema =mongoose.Schema;

var eventschema =new Schema(
  {
    Ename :String,
    Dname : String,
    shortD : String,
    longD :  String,
    Contact : Number
  }
);

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
