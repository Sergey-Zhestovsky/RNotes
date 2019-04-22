let mongoose = require("mongoose"),
  crypto = require("crypto"),
  Schema = mongoose.Schema;

let projectScheme = new Schema({
  title: {
    type: String,
    required: true
  },
  context: {
    type: String
  },
  image: {
    type: Schema.Types.ObjectId
  }
}, { versionKey: false });

let projectImageScheme = new Schema({
  extension: {
    type: String,
    required: true
  }, 
  size: {
    type: Number,
    required: true
  }
}, { versionKey: false });

module.exports = {
  Project: mongoose.model('Project', projectScheme),
  ProjectImage: mongoose.model('ProjectImage', projectImageScheme)
}