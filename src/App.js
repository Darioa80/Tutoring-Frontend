import "./App.css";
import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import { AuthContext } from "./context/auth-context";
import LogInNav from "./components/Navigation/Login";
import { useAuth } from "./util/auth-hook";
import Routes from "./components/Navigation/Routes"
import Footer from "./components/footer"


function App() {
  const { login, logout, userInfo } = useAuth();
  const {token, userID, email, firstName} = userInfo;
  
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
          <Routes />
          <Footer />
        </main>
        
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
