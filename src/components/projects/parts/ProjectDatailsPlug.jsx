import React, { Component } from "react";

export default function ProjectDatailsPlug(props) {
  let { foundState } = props;
  return (
    <div className="project_plug">
      {
        foundState
          ? <div className="project_plug-load"></div>
          : (
            <div className="project_plug-error">
              <div className="project_plug-error-text">NOT FOUND</div>
              <button className="project_plug-error-button" onClick={props.handleClick}>
                <i className="fa fa-arrow-left fa-lg"></i>
                <span>Go back</span>
              </button>
            </div>
          )
      }
    </div>
  );
};