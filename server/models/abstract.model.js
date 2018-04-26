var mongoose = require('mongoose');  
var AbstractSchema = new mongoose.Schema({
  author_id: String,
  title: String,
  sections: [Number],
  collaborators: [String],
  date: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: Number, 
    default: 0 
  },
  content: String,
  comments: [String]
});

mongoose.model('Abstract', AbstractSchema);
module.exports = mongoose.model('Abstract');