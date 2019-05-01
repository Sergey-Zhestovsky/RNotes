import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import ServerErrorMessage from "./ServerError";
import { connect } from "react-redux";
import { signUp } from "../../storage/actions/userActions";
import Validator from "../../js/validator";
import Authorization from "../../hoc/Authorization";

import "../../css/Authorization.css"

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        fullName: "",
        email: "",
        password: "",
        rePassword: ""
      },
      errors: {}
    };
    this.maxFieldSize = 100;
    this.validator = new Validator({
      email: ["required", "email", ["maxSize", this.maxFieldSize]],
      fullName: ["required", ["maxSize", this.maxFieldSize]],
      password: ["required", ["maxSize", this.maxFieldSize], ["password", "rePassword"]],
      rePassword: ["required"]
    });
  }
  

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let user = this.state.form,
      errors = this.validator.validate(user);

    this.setState({
      errors
    });

    if (Object.keys(errors).length == 0)
      this.props.signUp(user);
  }

  render() {
    return (
      <div className="authorization container">
        <form className="authorization_form" onSubmit={this.handleSubmit}>
          <h2 className="authorization_form-title">Sign Up</h2>
          <div className="authorization_form-block">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" name="fullName" id="fullName" onChange={this.handleChange}/>
            <ErrorMessage error={this.state.errors.fullName} />
          </div>
          <div className="authorization_form-block">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={this.handleChange}/>
            <ErrorMessage error={this.state.errors.email} />
          </div>
          <div className="authorization_form-block">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange}/>
            <ErrorMessage error={this.state.errors.password} />
          </div>
          <div className="authorization_form-block">
            <label htmlFor="rePassword">Repeat password</label>
            <input type="password" name="rePassword" id="rePassword" onChange={this.handleChange}/>
            <ErrorMessage error={this.state.errors.rePassword} />
          </div>
          <ServerErrorMessage error={this.props.authError} />
          <div className="authorization_form-block">
            <button className="authorization_form-submit">Registrate</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error.signUp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (user) => dispatch(signUp(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)
  (Authorization (SignUp, { authorized: false, redirect: "/" }));