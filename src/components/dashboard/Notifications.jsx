import React from "react";
import NotificationBlock from "./parts/NotificationBlock";

export default function Notifications(props) {
  let { isConnected: connection, notifications } = props.events,
    notificatioList = notifications && notifications.map((event) =>
      <NotificationBlock event={event} key={event._id} />
    ),
    resultBlock = setNotificationBlock(connection, notificatioList);

  return (
    <div className="notification">
      <div className="notification_header">Notifications</div>
      <div className="notification_body">
        {resultBlock}
      </div>
    </div>
  );
}

function setNotificationBlock(connect, events) {
  if (connect === null)
    return <div className="notification_load"></div>;

  if (connect === false)
    return <div className="notification_empty-message">Bad connection.</div>;

  if (connect === true && events.length)
    return events;

  if (connect === true && !events.length)
    return <div className="notification_empty-message">Nothing yet.</div>;
}