import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function SignedInLinks() {
  return (
    <div className="navbar_menu-list">
      <NavLink exact to="/" className="navbar_menu-item">New project</NavLink>
      <Link to="" className="navbar_menu-item">Log Out</Link>
      <Link to="" className="navbar_menu-item user-menu">
        <div className="user-menu_logo">
          <div className="user-menu_logo-alt">SZ</div>
        </div>
      </Link>
    </div>
  );
}