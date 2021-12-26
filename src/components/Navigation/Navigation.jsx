import React from "react";
import { NavLink } from "react-router-dom";
import "../../scss/Navigation.scss";


const Navigation = (props) => {
  return (
    <React.Fragment>
      <header>
        <nav className="mainNav">
          <NavLink exact to="/" className="navLink">
            Home
          </NavLink>
          <NavLink to="/subjects" className="navLink">
            Subjects
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
