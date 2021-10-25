import React from "react";
import "../scss/text.scss";
import "../scss/wrap.scss";
import MainGrid from "../components/main-grid";
import Login from "../components/Navigation/Login";
import { BioBlocks } from "./../components/home-bio-blocks";
const Home = () => {
  return (
    <React.Fragment>
      <div className="wrapper-padding">
        <div className="flexCol">
          <h1 className="mainTitle">Be Curious.</h1>
          <h3 className="subTitle">STEM Tutoring Services by Dario</h3>
          <hr />
          <MainGrid />
          <BioBlocks />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
