import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import Home from "./pages/home";
import Login from "./pages/login";
import RequestPage from "./pages/request";
import AppointmentsPage from "./pages/appointments";
import { Subjects } from "./pages/subjects";
import { AuthContext } from "./context/auth-context";
import LogInNav from "./components/Navigation/Login";
import SignUp from "./pages/sign-up";
import { useAuth } from "./util/auth-hook";

function App() {
  const { login, logout, token, userID, email, firstName } = useAuth();
  console.log(userID);
  return (
    <Router>
      <AuthContext.Provider
        value={{
          email,
          userID,
          token,
          firstName,
          login,
          logout,
        }}
      >
        <Navigation />
        <LogInNav />
        <main>
          {token && (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/subjects" exact component={Subjects} />
              <Route path="/requests" exact component={RequestPage} />
              <Route path="/requests/me" component={AppointmentsPage} />
              <Route
                path="/requests/:subject_id"
                exact
                component={RequestPage}
              />
            </Switch>
          )}
          {!token && (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/subjects" exact component={Subjects} />
            </Switch>
          )}
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
