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

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
