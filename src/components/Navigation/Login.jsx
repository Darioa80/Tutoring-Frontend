import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

import { AuthContext } from "./../../context/auth-context";
import "../../scss/wrap.scss";
import "../../scss/Navigation.scss";
const LogIn = () => {
  const history = useHistory();
  const { firstName, logout, token, userID } = useContext(AuthContext);

  const [stateToken, setStateToken] = useState(token);

  const callLogout = () => {
    setStateToken(null);
    logout();
  };

  const RequestSession = () => {
    history.push("/requests");
  };
  return (
    <React.Fragment>
      {!token && (
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
      {token && (
        <React.Fragment>
          <div className="logged-in-div">
            <div className="logged-in-background">
              <p className="logged-in-text logged-in-actions">
                <Link to={`requests/me`}>My Appointments</Link>
              </p>

              {/* <p id="spacer">{` | `}</p> */}
              <p className="logged-in-text ">Welcome back, {firstName}</p>
              {/* <p id="spacer">{` | `}</p> */}
              <p
                className="logged-in-text logged-in-actions"
                onClick={callLogout}
              >{`Logout`}</p>
            </div>
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
