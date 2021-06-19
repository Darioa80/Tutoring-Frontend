import React from "react";
import "../components/text.scss";
import "../components/wrap.scss";
import Navigation from "../components/Navigation/Navigation";
import MainGrid from "../components/main-grid";
const Home = () => {
  return (
    <React.Fragment>
      <div className="wrapper-padding">
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
