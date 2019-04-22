let mongoose = require("mongoose"),
  config = require("../../config");

mongoose.connect( config.mongoDB_connect.uri, config.mongoDB_connect.options );

module.exports = mongoose;