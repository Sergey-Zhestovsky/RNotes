import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Authorization(WrappedComponent, { authorized, redirect }) {
  class WithAuthorization extends Component {
    render() {
      if ( this.props.authState === authorized)
        return <WrappedComponent {...this.props} />
      
      return <Redirect to={ redirect } />
    }
  }

  return connect(mapStateToProps)(WithAuthorization)
}

function mapStateToProps(state) {
  return {
    authState: state.auth.isAuthorize
  }
}

export default Authorization;