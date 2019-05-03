let mongoose = require("mongoose"),
  schemas = require("./schemas");
  
require("./hooks");

module.exports = {
  Project: mongoose.model('Project', schemas.projectSchema),
  ProjectImage: mongoose.model('ProjectImage', schemas.projectImageSchema),
  User: mongoose.model('User', schemas.userSchema),
  Notification: mongoose.model('Notification', schemas.notificationSchema)
}