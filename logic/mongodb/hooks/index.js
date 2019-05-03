let schemas = require("../schemas"),
  notificationActions = require("../actions/notificationActions"),
  EventEmitter = require('events').EventEmitter,
  notificationEvent = new EventEmitter;

schemas.userSchema.post("save", function (doc) {
  let notification = {
    user: doc._id,
    action: "just joined us",
    date: Date.now()
  };

  return notificationActions.setNotification(notification);
});

schemas.projectSchema.post("save", function (doc) {
  let notification = {
    user: doc.user,
    action: "created new post",
    date: Date.now()
  };

  return notificationActions.setNotification(notification);
});

schemas.notificationSchema.post("save", function (doc) {
  notificationActions.getNotification(doc)
    .then(result => notificationEvent.emit("save", result))
    .catch(error => console.log(error));
});

module.exports = notificationEvent;