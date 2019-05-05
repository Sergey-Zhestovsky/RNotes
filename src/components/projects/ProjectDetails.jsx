import React, { Component } from "react";
import rootConnector from "../../storage/connection/rootConnector";
import ProjectDatailsPlaceholder from "./parts/ProjectDatailsPlaceholder";
import ProjectDatailsPlug from "./parts/ProjectDatailsPlug";
import Authorization from "../../hoc/Authorization";

import "../../css/ProjectDetails.css"

class ProjectDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFound: true,
      project: null
    };
  }

  getProject (id) {
    return rootConnector.projectConnector.getProject(id)
      .then((result) => {
        if (!result)
          return this.setState({
            isFound: false
          })

        return this.setState({
          project: result
        })
      }, (error) => {
        this.setState({
          isFound: false
        })
      })
  }

  onBackButtonClick = (e) => {
    return this.props.history.push('/');
  }

  componentDidMount() {
    this.getProject(this.props.match.params.id);
  }

  render() {
    return (
      <div className="project-wrapper">
        <div className="project">
          {
            this.state.project
              ? <ProjectDatailsPlaceholder project={this.state.project} />
              : <ProjectDatailsPlug
                foundState={this.state.isFound}
                handleClick={this.onBackButtonClick} />
          }
        </div>
      </div>
    );
  }
}

export default Authorization(ProjectDetails, { authorized: true, redirect: "/signin" });