var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require("../config/main.js");
var postConfig = require("../config/post.js");
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var User = require('../models/user.model');

var noAccessErrorMessage = {
  success: false, 
  message: 'No access to sending messages.' 
};

router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  var token = req.headers['token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json(noAccessErrorMessage);
      }
    });
  }

  User.findOne({ 
    _id: req.body.id
  } , function (err, user) {
    if (err || user == null) {
      return res.json(noAccessErrorMessage);
    }  
  });
  next();
});

router.post('/', function (req, res) {
  let transporter = nodemailer.createTransport( postConfig.transporter );
  let mailOptions = {
    from: postConfig.fromAddress,
    to: req.body.email,
    subject: 'Registration successfully!',
    text: req.body.letter,
    html: req.body.letter
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send(500).json({
        success: false,
        message: "Letted no sended"
      });
    } else {
      return res.send(200).json({
        success: true,
        message: "Letted sended"
      });
    }
    transporter.close();
  });
});

module.exports = router;