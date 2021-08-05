import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

import { AuthContext } from "./../../context/auth-context";
import "../../scss/wrap.scss";
import "../../scss/Navigation.scss";
const LogIn = () => {
  const history = useHistory();
  const { firstName } = useContext(AuthContext);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(firstName);
  }, [firstName]);

  const RequestSession = () => {
    history.push("/request");
  };
  return (
    <React.Fragment>
      {!name && (
        <nav className="login-nav">
          <NavLink className="login-nav-spacing" to="/signup">
            Sign Up
          </NavLink>
          <span style={{ color: "black" }}> | </span>
          <NavLink className="login-nav-spacing" to="/login">
            Log In
          </NavLink>
        </nav>
      )}
      {name && (
        <React.Fragment>
          <div className="logged-in-div">
            <p className="logged-in-text">Welcome back, {name}</p>

            <button id="tutoring-request" onClick={RequestSession}>
              Request a Tutoring Session
            </button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LogIn;
