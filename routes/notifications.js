let io = require("socket.io"),
  notificationEvent = require("../logic/mongodb/hooks"),
  notificationActions = require("../logic/mongodb/actions/notificationActions");``

class NotificationRouter {
  constructor({ connect }) {
    this.io = io(connect);

    this.io.on("connection", function (socket) {
      notificationActions.getNotifications({ length: 3 })
        .then(notifications => {
          socket.emit("get notifications", notifications)
        })
        .catch(error => { console.log(error); });
    });

    notificationEvent.on("save", (notification) => {
      this.emitMessage("new notification", notification);
    });
  }

  emitMessage(name, content) {
    this.io.emit(name, content);
  }
}

module.exports = NotificationRouter;