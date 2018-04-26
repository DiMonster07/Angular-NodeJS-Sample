var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
var User = require('../models/user.model');  
var config = require('./main');

module.exports = function(passport) {  
  var options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeader();
  options.secretOrKey = config.secret;
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};