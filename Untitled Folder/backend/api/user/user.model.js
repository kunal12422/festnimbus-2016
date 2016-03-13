
'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({

  email: { type: String, lowercase: true },
  hashedPassword: String,
  salt: String,
  mobile:Number,
  rollno:Number,
  nitian:Boolean


});


userSchema.set('toJSON', {
  virtuals: true
});

userSchema
  .virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){
    return this._password;
  });


userSchema
  .virtual('profile')
  .get(function(){
    return {

      'email':this.email,
      'rollno':this.rollno
    };

  });


userSchema
  .virtual('token')
  .get(function(){
    return {
      '_id': this._id,
      'email':this.email
    }
  });


userSchema
  .path('email')
  .validate(function(value, respond){
    var self = this;
    this.constructor.findOne({email: value}, function(err, user){
      if(err) throw err;
      if(user){
        if(self.id === user.id) return respond(true);
      }
      return respond(true);
    })
  }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};


userSchema
  .pre('save', function(next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });


userSchema.methods = {

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function(){
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }

};



module.exports = mongoose.model('User', userSchema);
