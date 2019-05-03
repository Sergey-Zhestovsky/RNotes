import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { initProjects, getProjects } from "../../storage/actions/projectActions";

import "../../css/Dashboard.css"

class Dashboard extends Component {
  componentDidMount() {
    this.props.initProjects();
  }

  componentWillUnmount() {
    this.props.clearProjects();
  }

  render() {
    let { projectObject, events } = this.props;

    return (
      <div className="dashboard-wrapper">
        <div className="dashboard container">
          <div className="projects-wrapper">
            <ProjectList
              projectList={projectObject.projects}
              addButtonHandler={this.props.getProjects}
              allLoaded={projectObject.allLoaded} />
          </div>
          <div className="notifications-wrapper">
            <Notifications events={events} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projectObject: state.project,
    events: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initProjects: (length) => dispatch(initProjects(length)),
    getProjects: (length) => dispatch(getProjects(length)),
    clearProjects: () => dispatch({ type: "CLEAR_PROJECTS" })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
  //(Authorization(Dashboard, { authorized: true, redirect: "/signin" }));