import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";

import "../../css/Authorization.css"

export default class SignIn extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="authorization container">
        <form className="authorization_form" onSubmit={this.handleSubmit}>
          <h2 className="authorization_form-title">Sign In</h2>
          <div className="authorization_form-block">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={this.handleChange}/>
            <ErrorMessage />
          </div>
          <div className="authorization_form-block">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="authorization_form-block">
            <button className="authorization_form-submit">Log in</button>
          </div>
        </form>
      </div>
    );
  }
}