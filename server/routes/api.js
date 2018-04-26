const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../config/main.js');
var jwt = require('jsonwebtoken');

var UserController = require('../controllers/user.controller');
var AbstractController = require('../controllers/abstract.controller');
var AuthenticateController = require('../controllers/authenticate.controller');
var PostController = require('../controllers/post.controller');

mongoose.connect('mongodb://localhost:27017/iahr', function(err) {
  if(err) {
    console.log('Not connected to the database');
  } else {
    console.log('Successfully connected to MondgoDB');
  }
});

router.use(function(req, res, next) {
  if (mongoose.connection.readyState == 0) { 
    res.status(500).send(JSON.stringify({ succes: false, message: 'Server is temporarily unavailable. Please, try later' }));
  } else {
    next();
  } 
});

router.get('/', (req, res) => {
  res.send('API isecarctic. Access is limited!');
});

router.use('/authenticate', AuthenticateController);
router.use('/users', UserController);
router.use('/post', PostController);
router.use('/abstracts', AbstractController);

module.exports = router;