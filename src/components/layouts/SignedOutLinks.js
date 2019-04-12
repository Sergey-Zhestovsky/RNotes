import React from "react";
import { NavLink } from "react-router-dom";

export default function SignedOutLinks() {
  return (
    <div className="navbar_menu-list">
      <NavLink to="/" className="navbar_menu-item">Sign up</NavLink>
      <NavLink to="/" className="navbar_menu-item">Log in</NavLink>
    </div>
  );
}