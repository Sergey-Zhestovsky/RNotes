import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";

import "../../css/Dashboard.css"

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="projects-wrapper">
          <ProjectList />
        </div>
        <div className="notifications-wrapper">
          <Notifications />
        </div>
      </div>
    );
  }
}