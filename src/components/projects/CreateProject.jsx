import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../storage/actions/projectActions";
import FileInput from "./parts/FileInput";
import FormErrors from "./parts/FormErrors";
import Validator from "../../js/validator";
import Authorization from "../../hoc/Authorization";

import "../../css/CreateProject.css";

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.messageMaxSize = 5000;
    this.imageMaxSize = 20000000;
    this.imageType = /^image\/*/;
    this.dragCounter = 0;
    this.state = {
      form: {
        title: "",
        message: "",
        image: {}
      },
      errors: {},
      backgroundImage: "",
      isDragged: false
    };
    this.validator = new Validator({
      title: ["required", ["maxSize", 50]],
      message: [["maxSize", this.messageMaxSize]],
      image: {
        property: ["type", "size"],
        rules: [
          ["test", this.imageType, "imageType"],
          ["larger", this.imageMaxSize, "imageSize"]
        ]
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value.trim()
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let project = this.state.form,
      errors = this.validator.validate(project);

    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      project.date = Date.now();
      this.props.createProject(project);
      this.props.history.push('/');
    }
  }

  onImageAdded = (file) => {
    if (!file)
      return;

    this.setState({
      form: {
        ...this.state.form,
        image: file
      }
    });

    if (!this.imageType.test(file.type))
      return this.setState({
        backgroundImage: ""
      });;

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        backgroundImage: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  onImageDeleted = () => {
    this.setState({
      form: {
        ...this.state.form,
        image: {}
      },
      backgroundImage: ""
    });
  }

  handleDragEnter = (e) => {
    let isFile = e.dataTransfer.types[0] === "Files";

    if (!isFile)
      return;

    e.preventDefault();
    this.dragState(true);
    this.dragCounter++;
  }

  handleDragEnd = (e) => {
    let isFile = e.dataTransfer.types[0] === "Files";

    if (!isFile)
      return;

    e.preventDefault();
    this.dragCounter--;
    this.dragState(false);
  }

  handleDrop = (e) => {
    e.preventDefault();
    this.dragCounter = 0;
    this.dragState(false);
  }

  dragState = (isDragged) => {
    if (this.dragCounter === 0) {
      this.setState({
        isDragged
      });
    }
  }

  render() {
    return (
      <div className="create-project-wrapper">
        <div className="create-project container">
          <form className="create-project_form" autoComplete="off" onSubmit={this.handleSubmit} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragEnd} onDrop={this.handleDrop} >
            <h2 className="create-project_form-title">Create Project</h2>
            <div className="create-project_form-block">
              <label className="create-project_form-block-title" htmlFor="title">Title</label>
              <input type="text" name="title" id="title" onChange={this.handleChange} />
            </div>
            <div className="create-project_form-block">
              <label className="create-project_form-block-title" htmlFor="message">Message</label>
              <textarea name="message" id="message" onChange={this.handleChange} />
              <span className={`create-project_form-input-describe ${
                this.messageMaxSize - this.state.form.message.length < 0 ? "exceeded" : ""
                }`}>
                {`${this.state.form.message.length} / ${this.messageMaxSize}`}
              </span>
            </div>
            <div className="create-project_form-block">
              <span className="create-project_form-block-title">Image</span>
              <FileInput onImageAdded={this.onImageAdded}
                onImageDeleted={this.onImageDeleted}
                imageName={this.state.form.image.name}
                backgroundImage={this.state.backgroundImage}
                isDragged={this.state.isDragged} />
            </div>
            <FormErrors errors={this.state.errors} />
            <div className="create-project_form-block align-right">
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
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(null, mapDispatchToProps)(
  Authorization(CreateProject, { authorized: true, redirect: "/signin" })
);