import React, { Component } from "react";

export default function ErrorMessage(props) {
  let style = {
    display: props.isError ? "flex" : "none"
  };

  return (
    <div className="authorization_form-error" style={style}>
      <div className="authorization_form-error-symbol">
        <i className="fa fa-exclamation-triangle fa-lg"></i>
      </div>
      <div className="authorization_form-error-context">{props.text || ""}</div>
    </div>
  );
}