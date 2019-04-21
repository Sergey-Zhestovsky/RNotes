import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SignedOutLinks() {
  return (
    <div className="navbar_menu-list">
      <NavLink to="/signup" className="navbar_menu-item">Sign up</NavLink>
      <NavLink to="/signin" className="navbar_menu-item">Log in</NavLink>
    </div>
  );
}