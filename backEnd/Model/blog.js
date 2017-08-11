const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  createdBy: {
    type: String
   
  },
  createdAt: {
    type: String,
    default: Date.now()
  },
  thumbnail:{
    type: String,
    required: true,
  },
  summery: {
    type: String,
    required: true,
  },
  googledoc: {
    type: String,
  },
});

module.exports = mongoose.model('Blog', blogSchema);