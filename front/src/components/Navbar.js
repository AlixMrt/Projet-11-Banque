import React from "react";
import { NavLink } from "react-router-dom";

import bankLogo from "../assets/argentBankLogo.webp";
import AccountNav from "./AccountNav";

export default function Navbar() {
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={bankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <AccountNav />
    </nav>
  );
}
