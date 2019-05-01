import React, { Component } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { getProjects } from "../../storage/actions/projectActions";
import Authorization from "../../hoc/Authorization";

import "../../css/Dashboard.css"

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

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

function mapDispatchToProps(dispatch) {
  return {
    getProjects: () => dispatch(getProjects())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)
  (Authorization(Dashboard, { authorized: true, redirect: "/signin" }));