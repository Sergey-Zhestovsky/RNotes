import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SignedOutLinks() {
  return (
    <React.Fragment>
      <NavLink to="/signup" className="navbar_menu-item">Sign up</NavLink>
      <NavLink to="/signin" className="navbar_menu-item">Log in</NavLink>
    </React.Fragment>
  );
}