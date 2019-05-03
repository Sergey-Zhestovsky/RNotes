import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import ServerErrorMessage from "./ServerError";
import { connect } from "react-redux";
import { signIn } from "../../storage/actions/userActions";
import Validator from "../../js/validator";
import Authorization from "../../hoc/Authorization";

import "../../css/Authorization.css"

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: ""
      },
      errors: {}
    };
    this.maxFieldSize = 100;
    this.validator = new Validator({
      email: ["required", "email", ["maxSize", this.maxFieldSize]],
      password: ["required", ["maxSize", this.maxFieldSize]]
    });
  }

  handleChange = (e) => {
    let passwordField = e.target.type === "password",
      value = passwordField ? e.target.value : e.target.value.trim();

    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: value
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

    if (Object.keys(errors).length === 0)
      this.props.signIn(user);
  }

  render() {
    return (
      <div className="authorization container">
        <form className="authorization_form" onSubmit={this.handleSubmit}>
          <h2 className="authorization_form-title">Sign In</h2>
          <div className="authorization_form-block">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={this.handleChange} />
            <ErrorMessage error={this.state.errors.email} />
          </div>
          <div className="authorization_form-block">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange} />
            <ErrorMessage error={this.state.errors.password} />
          </div>
          <ServerErrorMessage error={this.props.authError} />
          <div className="authorization_form-block">
            <button className="authorization_form-submit">Log in</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error.signIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (user) => dispatch(signIn(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Authorization(SignIn, { authorized: false, redirect: "/" })
);