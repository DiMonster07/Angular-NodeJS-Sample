var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("../config/main.js"); 
var User = require('../models/user.model');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err || !user) {
      res.status(500).json({ 
        success: false, 
        message: 'Authentication failed. User or password wrong.' 
      });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          var token_data = {
            id: user._id,
            email: user.email,
            token: jwt.sign(JSON.stringify(user), config.secret)
          };
          res.status(200).json({ 
            success: true, 
            message: token_data 
          });
        } else {
          res.status(500).json({ 
            success: false, 
            message: 'Authentication failed. User or password wrong.' 
          });
        }
      });
    }
  });
});

module.exports = router;