var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require("../config/main.js"); 
var Abstract = require('../models/abstract.model');

router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
  var token = req.headers['token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.status(403).json({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });    
      } else {
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

router.post('/', function (req, res) {
  Abstract.create({
    author_id: req.body.author_id,
    title: req.body.title,
    sections: req.body.sections,
    collaborators: req.body.collaborators,
    comments: req.body.comments,
    content: req.body.content
  }, function (err, abstract) {
    if (err) {
      res.status(500).json({
        success: false,
        message: alerts[err.code]
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: abstract
      });
    }
  });
});

router.put('/:id', function (req, res) {
  Abstract.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, abstract) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Abstract not upated"
      });
    }
    else {
      res.status(200).json({
        success: true, 
        message: abstract
      });
    }
  });
});

router.get('/', function (req, res) {
  Abstract.find(function (err, abstracts) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "There was a problem finding the abstracts."
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: abstracts
      });
    }
  });
});

router.get('/author/:id', function (req, res) {
  Abstract.find({ author_id: req.params.id }, function (err, abstracts) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "There was a problem finding abstracts."
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: abstracts
      });
    }
  });
});

router.get('/:id', function (req, res) {
  Abstract.findOne({ 
    _id: req.params.id
  }, function (err, abstract) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Abstract not finded"
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: abstract
      });
    }
  });
});

router.delete('/:id', function (req, res) {
  Abstract.remove({ 
    _id: req.params.id
  }, function (err, abstract) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Abstract not finded"
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: abstract
      });
    }
  });
});

module.exports = router;