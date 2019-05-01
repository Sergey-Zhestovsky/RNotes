import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import CreateProject from "./components/projects/CreateProject";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import {connect} from "react-redux";

class App extends Component {
  render() {
    let { authorization } = this.props;

    return (
      <Router>
        <div className="App">
          <Navbar authorization={authorization} />
          <Switch>
              <Route path={["/", "/dashboard"]} exact component={Dashboard} />
              <Route path={"/project/:id"} component={ProjectDetails} />
              <Route path={"/newproject"} component={CreateProject} />
              <Route path={"/signin"} component={SignIn} />
              <Route path={"/signup"} component={SignUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.auth
  };
}

export default connect(mapStateToProps)(App);
