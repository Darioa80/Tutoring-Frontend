import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");
const api = "http://localhost:8080/";
// type Subject = {
//   "Subject_ID": Number;
//   "Subject_Name": String;
//   "Rate": Number;
//   "description": String;
//   "image": String;
// };

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    try {
      const { data } = await axios.get(api + "subjects/subjects");
      console.log(data);
      setSubjects(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    getSubjects();
  }, []);
  return (
    <React.Fragment>
      <div className="subjects-wrapper">
        {subjects.map((value, index) => {
          return (
            <SubjectCard
              image_path={value.image}
              title={value.Subject_Name}
              rate={value.Rate}
              description={value.description}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

const SubjectCard = (props) => {
  const { image_path, title, rate, description } = props;
  return (
    <div className="subject-outer">
      <div id="subject-img-wrapper">
        <img src={image_path} />
      </div>
      <h6>{title}</h6>
      {/* <p><span>Topics:</span></p> */}
      <p>{description}</p>
      <h6>{rate}</h6>
    </div>
  );
};
