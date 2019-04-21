import React, { Component } from "react";

export default function Authorization(props) {
  return (
    <div className="authorization">
      <form className="authorization_form">
        {props.children}
      </form>
    </div>
  );
}