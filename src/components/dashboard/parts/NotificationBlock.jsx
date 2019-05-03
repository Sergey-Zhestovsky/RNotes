import React from "react";
import moment from "moment";

export default function NotificationBlock(props) {
  let { event } = props;

  return (
    <div className="notification_body-block">
      <div className="notification_body-context">
        <span className="notification_body-context-user">{event.user}</span>
        <span className="notification_body-context-message">{event.action}</span>
      </div>
      <div className="notification_body-block-date">{moment(event.date).calendar()}</div>
    </div>
  );
}