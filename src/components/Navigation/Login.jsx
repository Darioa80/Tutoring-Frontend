import React from "react";
import { NavLink } from "react-router-dom";

const LogIn = () => {
  return (
    <React.Fragment>
      <nav className="login-nav">
        <NavLink className="login-nav-spacing" to="/">
          Sign Up
        </NavLink>
        <span style={{ color: "black" }}> | </span>
        <NavLink className="login-nav-spacing" to="/">
          Log In
        </NavLink>
      </nav>
    </React.Fragment>
  );
};

export default LogIn;
