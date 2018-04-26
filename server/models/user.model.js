var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Roles = require('../config/roles');

var UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true 
  },
  password: String,
  first_name: String,
  last_name: String,
  organization: String,
  address: String,
  city: String,
  country: String,
  postal_code: String,
  role: { 
    type: String, 
    default: Roles['user']
  },
  about: { 
    type: String, 
    default: "" 
  },
  is_verify: {
    type: Boolean, 
    default: false
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');