'use strict';

var mongoose =require('mongoose');
var Schema =mongoose.Schema;


const getTags = function(tags){
  return tags.join(';');
};

const setTags = function(tags){
  return tags.split(';');
};

var teamSchema = new Schema({
  teamName: {
    type:String
  },

  events:{ type: [], get: getTags, set: setTags }
});
module.exports =mongoose.model('Teams',teamSchema);
