import React from "react";
import { NavLink, Router } from "react-router-dom";
import "../../scss/Navigation.scss";
import Login from "./Login";

const Navigation = (props) => {
  return (
    <React.Fragment>
      <header>
        <nav className="mainNav">
          <NavLink to="/" className="navLink">
            Home
          </NavLink>
          <NavLink to="/bio" className="navLink">
            Subjects
          </NavLink>
          <NavLink to="/bio" className="navLink">
            Testimonials
          </NavLink>
          <NavLink to="/bio" className="navLink">
            Bio
          </NavLink>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navigation;
