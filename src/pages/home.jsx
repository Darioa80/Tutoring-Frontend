import React from "react";
import "../scss/text.scss";
import "../scss/wrap.scss";
import MainGrid from "../components/main-grid";
import Login from "../components/Navigation/Login";
const Home = () => {
  return (
    <React.Fragment>
      <div className="wrapper-padding">
        <Login />
        <div className="flexCol">
          <h1 className="mainTitle">Tutoring w/ Dario</h1>
          <hr />
          <MainGrid />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
