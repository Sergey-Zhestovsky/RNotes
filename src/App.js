import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import CreateProject from "./components/projects/CreateProject";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
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

export default App;
