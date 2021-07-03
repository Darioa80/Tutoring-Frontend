import React, { Component } from "react";
import "../scss/wrap.scss";
import "../scss/text.scss";

const MainGrid = () => {
  const acc = [
    "Bilingual",
    "Award Winning Tutor",
    "B.S. + M.S in Engineering ",
    "3+ years of STEM Tutoring experience",
  ];

  return (
    <div style={{ width: "100%" }}>
      <div className="home-grid">
        <div className="home-main-grid-img">
          <img
            src="dario-main.jpg"
            alt="Picture of Dario Andrade Mendoza in Washington DC"
          />
        </div>
        <div className="home-main-grid-acc">
          {acc.map((accItem, Index) => (
            <h2 className="accHeader">{accItem}</h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
