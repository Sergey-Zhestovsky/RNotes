import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import "../../css/Navbar.css";
import logo from "../../img/RNlogo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar_menu container">
        <Link to="/" className="navbar_logo">
          <img className="navbar_logo-img" src={logo} alt="React Notes"/>
        </Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  );
}