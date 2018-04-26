const mongoose = require('mongoose');

var User = require('../models/user.model');

mongoose.connect('mongodb://localhost:27017/iahr/iahr', function(err) {
  if(err) throw err;
  console.log("Successfully connected");
});