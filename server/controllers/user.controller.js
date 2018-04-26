var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("../config/main.js"); 
var User = require('../models/user.model');

const alerts = { '11000': 'User already exist' };

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function (req, res, next) {
  User.create({
    email: req.body.email,
    password: ( req.body.password ? bcrypt.hashSync(req.body.password, 10) : null ),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    organization: req.body.organization,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    postal_code: req.body.postal_code,
    about: req.body.about,
    is_verify: req.body.is_verify
  }, function (err, user) {
    if (err) {
      res.status(500).json({
        success: false,
        message: alerts[err.code]
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: user
      });
    }
  });
});

router.use(function(req, res, next) {
  var token = req.headers['token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });    
      } 
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
});

router.put('/:id', function (req, res) {
  if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, data) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "User not upated"
      });
    }
    var token_data = {
      _id: data._id,
      email: data.email,
      token: jwt.sign(JSON.stringify(data), config.secret)
    };
    res.status(200).json({
      success: true, 
      message: token_data
    });
  });
});

router.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "There was a problem finding the users."
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: users
      });
    }
  });
});

router.get('/:id', function (req, res) {
  User.findOne({ 
    _id: req.params.id
  }, function (err, user) {
    if (err || user == null) {
      res.status(500).json({
        success: false,
        message: "User not finded"
      });
    }  
    else {
      res.status(200).json({
        success: true,
        message: user
      });
    }
  });
});

router.get('/email/:email', function (req, res, next) {
  User.findOne({
    email: req.params.email
  }, function (err, user) {
    if (err || user == null) {
      res.status(500).json({
        success: false,
        message: "User not finded"
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: user
      });
    }
  });
});

router.delete('/:id', function (req, res) {
  User.findOne({ 
    _id: req.params.id
  }, function (err, user) {
    if (err || user == null) {
      res.status(500).json({
        success: false,
        message: "User not finded"
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: "Delete is successfull"
      });
    }
  });
});

module.exports = router;