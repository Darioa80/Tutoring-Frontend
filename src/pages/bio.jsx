import React, { useState } from "react";
import text from "../util/bio-text";

const Bio = () => {
  console.log(text);

  const [currentSlide, setCurrentSlide] = useState(0);
  const tab_titles = ["About", "2012", "2014", "2015", "2019", "2020", "2021"];
  const tab_images = [
    "dario-2.jpg",
    "dario-tucson.jpg",
    "dario-2014.jpg",
    "dario-2015.jpg",
    "dario-wgrc.jpg",
    "dario-2020.jpg",
    "dario-final.jpg",
  ];
  const handleTabChange = (e) => {
    tab_titles.map((element, index) => {
      if (element.includes(e.target.textContent)) {
        setCurrentSlide(index);
      }
    });
  };

  return (
    <div className="wrapper-padding bio-wrapper">
      <div className="bio-image-wrapper">
        <figure>
          <img src={tab_images[currentSlide]} />
        </figure>
      </div>

      <div className="bio-text">
        <p>{text[currentSlide]}</p>
      </div>

      <div className="tabs-wrapper">
        <ul className="bio-tabs">
          {tab_titles.map((element, index) => {
            return (
              <li
                onClick={handleTabChange}
                value={element}
                key={index + "bio_tabs"}
                className={currentSlide == index ? "active" : ""}
              >
                {element}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Bio;
