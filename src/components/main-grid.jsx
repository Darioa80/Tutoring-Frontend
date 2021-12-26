import React, { Component, useRef } from "react";

import "../scss/wrap.scss";
import "../scss/text.scss";
import { Link } from "react-router-dom";

const MainGrid = () => {
  const acc = [
    "Bilingual",
    "Award Winning Tutor",
    "B.S. + M.S in Engineering ",
    "2+ years of STEM Tutoring experience",
    "Local Community Leader",
  ];

  const showDiv = () => {
    hiddenDiv.current.style.display = "flex";
    imageRef.current.style.opacity = "0.55";
    imageRef.current.style.transform = "scale(1.1)";
  };

  const hideDiv = () => {
    hiddenDiv.current.style.display = "none";
    imageRef.current.style.opacity = "1";
    imageRef.current.style.transform = "scale(1)";
  };
  const hiddenDiv = useRef(null);
  const imageRef = useRef(null);
  return (
    <div style={{ width: "100%" }}>
      <div className="home-grid">
        <div
          className="home-main-grid-img"
          onMouseEnter={showDiv}
          onMouseLeave={hideDiv}
        >
          <figure>
            <Link to="/bio">
              <div ref={hiddenDiv} className="hover-image">
                <p>Bio</p>
              </div>
            </Link>

            <img
              ref={imageRef}
              id="home"
              src="dario-1.jpg"
              alt="Picture of Dario Andrade Mendoza in Washington DC"
            />
          </figure>
        </div>
        <div className="home-main-grid-acc">
          <ul>
            {acc.map((accItem, Index) => (
              <li key={"accHeader" + Index}className="accHeader">{accItem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
