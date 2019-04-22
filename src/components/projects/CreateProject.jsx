import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../storage/actions/projectActions";

import "../../css/CreateProject.css";

class CreateProject extends Component {
  state = {
    title: "",
    message: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.createProject(this.state);
  }

  render() {
    return (
      <div className="create-project-wrapper">
      <div className="create-project container">
        <form className="create-project_form" onSubmit={this.handleSubmit}>
          <h2 className="create-project_form-title">Create Project</h2>
          <div className="create-project_form-block">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={this.handleChange}/>
          </div>
          <div className="create-project_form-block">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" onChange={this.handleChange}/>
          </div>
          <div className="create-project_form-block">
            <button className="create-project_form-submit">Create</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createProject: (project) => dispatch( createProject(project) )
  }
} 

export default connect(null, mapDispatchToProps)(CreateProject);