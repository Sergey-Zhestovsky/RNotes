import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";

import "../../css/Dashboard.css"

class Dashboard extends Component {
  render() {
    let { projects } = this.props;

    return (
      <div className="dashboard-wrapper">
        <div className="dashboard container">
          <div className="projects-wrapper">
            <ProjectList projects={projects} />
          </div>
          <div className="notifications-wrapper">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.project.projects
  };
}

export default connect(mapStateToProps)(Dashboard);