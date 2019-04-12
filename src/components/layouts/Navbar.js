import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar_menu">
        <Link to="/" className="logo">React Notes</Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  );
}