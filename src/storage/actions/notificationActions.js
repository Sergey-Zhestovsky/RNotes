import Socket from "socket.io-client";

export function createNotificationSocket() {
  return (dispatch, getState) => {
    let socket = Socket();

    socket.on("new notification", (notification) => {
      dispatch({
        type: "NEW_NOTIFICATION",
        notification
      });
    });

    socket.on("get notifications", (notifications) => {
      dispatch({
        type: "GET_NOTIFICATIONS",
        notifications
      });
    });

    socket.on('connect_timeout', (timeout) => {
      socket.close();
      dispatch({
        type: "CONNECTION_ERROR"
      });
    });

    socket.on('connect_error', (error) => {
      socket.close();
      dispatch({
        type: "CONNECTION_ERROR"
      });
    });
  }
}