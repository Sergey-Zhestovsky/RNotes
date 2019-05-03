import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../storage/actions/userActions";

function SignedInLinks(props) {
  let regExp = new RegExp("^(\\p{L})\\p{L}*\\s+(\\p{L})\\p{L}*$", "u"),
    userInitials = props.authUser
    ? (props.authUser.fullName).replace(regExp, "$1$2")
    : "";
    
  return (
    <React.Fragment>
      <NavLink to="/newproject" className="navbar_menu-item">New project</NavLink>
      <button className="navbar_menu-item" onClick={props.signOut}>Log Out</button>
      <Link to="" className="navbar_menu-item user-menu">
        <div className="user-menu_logo">
          <div className="user-menu_logo-alt">{userInitials}</div>
        </div>
      </Link>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    authUser: state.auth.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);