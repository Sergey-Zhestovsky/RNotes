import React from "react";

export default function ServerError(props) {
  if (!props.error) 
    return null;

  return (
    <div className="server-error">
      {props.error.message}
    </div>
  );
}