import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../storage/actions/userActions";

function SignedInLinks(props) {
  return (
    <React.Fragment>
      <NavLink to="/newproject" className="navbar_menu-item">New project</NavLink>
      <a className="navbar_menu-item" onClick={props.signOut}>Log Out</a>
      <Link to="" className="navbar_menu-item user-menu">
        <div className="user-menu_logo">
          <div className="user-menu_logo-alt">SZ</div>
        </div>
      </Link>
    </React.Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(null, mapDispatchToProps)(SignedInLinks);