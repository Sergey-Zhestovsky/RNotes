import React, { Component } from "react";

const errorMessages = {
  "required": "Field is required",
  "maxSize": "Maximum number of characters exceeded",
  "imageType": "File should be image"
}

export default function FormErrors(props) {
  let errorBlocks = [];

  for (let error in props.errors) {
    let errorArray = props.errors[error];

    for (let i = 0; i < errorArray.length; i++) {
      errorBlocks.push(
        <div className="create-project_error-block" key={error}>
          <div className="create-project_error-block-title">{error}:</div>
          <div className="create-project_error-block-message">{errorMessages[props.errors[error][i]]}</div>
        </div>
      );
    }
  }

  return (
    <div className="create-project_error">
      {errorBlocks}
    </div>
  );
}