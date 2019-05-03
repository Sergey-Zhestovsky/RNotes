import React from "react";

const errorMessages = {
  "required": "Field is required",
  "maxSize": "Maximum number of characters exceeded",
  "email": "Enter correct email",
  "password": "Passwords do not match",
  "fullName": "Enter a full name"
}

export default function ErrorMessage(props) {
  let style = {
    display: props.error ? "flex" : "none"
  };

  return (
    <div className="authorization_form-error" style={style}>
      <div className="authorization_form-error-symbol">
        <i className="fa fa-exclamation-triangle fa-lg"></i>
      </div>
      <div className="authorization_form-error-context">{
        props.error ? errorMessages[props.error[0]] : ""
      }</div>
    </div>
  );
}