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
import { Subjects } from "./pages/subjects";
import { AuthContext } from "./context/auth-context";

import SignUp from "./pages/sign-up";
import { useAuth } from "./util/auth-hook";

function App() {
  const { login, logout, token, userID, email, firstName } = useAuth();

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
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/subjects" exact component={Subjects} />
            <Route path="/request" exact component={RequestPage} />
          </Switch>
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
