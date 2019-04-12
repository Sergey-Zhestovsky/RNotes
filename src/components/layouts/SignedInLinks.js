import React from "react";
import { NavLink } from "react-router-dom";

export default function SignedInLinks() {
  return (
    <div className="navbar_menu-list">
      <NavLink to="/" className="navbar_menu-item">New project</NavLink>
      <NavLink to="/" className="navbar_menu-item">Log Out</NavLink>
      <NavLink to="/" className="navbar_menu-item">SZ</NavLink>
    </div>
  );
}