import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import HTTPModal from "../components/HTTPModal";

const axios = require("axios");
// type Subject = {
//   "Subject_ID": Number;
//   "Subject_Name": String;
//   "Rate": Number;
//   "description": String;
//   "image": String;
// };

export const Subjects = () => {
  const history = useHistory();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  const getSubjects = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}subjects/subjects`);
      const result = await axios.get(`${process.env.REACT_APP_API_URL}subjects/topics`);
      let initial_id = result.data[0].subject_id;
      let arrays = {};
      arrays[initial_id] = [result.data[0].topic];

      result.data.map((value, index) => {
        let current = value.subject_id;
        if (index > 0) {
          if (Object.keys(arrays).includes(current.toString())) {
            arrays[current] = [...arrays[current], value.topic];
          } else {
            arrays[current] = [value.topic];
          }
        }
      });

      data.map((value, index) => {
        data[index] = { ...data[index], topics: arrays[index + 1] };
      });

      setSubjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  const RequestSession = (subject_id) => {
    if (auth.token) {
      history.push(`/requests/${subject_id}`);
    } else {
      history.push("/login");
    }
  };

  useEffect(async () => {
    console.log("Subjects Rendered");
    getSubjects();
  }, []);

  useEffect(() =>{
    setLoading(false);
    
  }, [subjects]);

  return (<React.Fragment>
    {loading && <HTTPModal 
      show={true}
      id={"confirm"}
      message={"Loading...."}
      /> }
    {!loading && <div className="subjects-page-wrapper">
      <div className="flex-col">
        <h2>Subjects</h2>
        <p style={{textAlign: "center"}}>
          Subjects listed are offered for tutoring. The cost displayed is for a
          1 hour session. To request a session, click on the
          title of any of the subjects.
        </p>
      </div>
      <div className="subjects-wrapper">
        {subjects.map((value, index) => {
          return (
            <SubjectCard
              key={"subject card" + index}
              subject_id={value.Subject_ID}
              image_path={value.image}
              title={value.Subject_Name}
              rate={value.Rate}
              description={value.description}
              topics={value.topics}
              RequestSession={RequestSession}
            />
          );
        })}
      </div>
    </div>}
    
    </React.Fragment>
  );
};

const SubjectCard = (props) => {
  const { subject_id, image_path, title, rate, description, topics } = props;
 
  return (
    <div className="subject-outer">
      <div className="subject-image-background">
        <img src={image_path} />
      </div>
      <h6
        onClick={() => {
          props.RequestSession(subject_id);
        }}
      >{`${title} - $${rate}`}</h6>

      <p id="topics">
        Topics:{" "}
        {topics.map((value, index) => {
          const key = "subject topic" + subject_id + index;
          if (index != topics.length - 1) {
            return <span key={key}>{`${value}, `}</span>;
          } else {
            return <span key={key}>{`${value}`}</span>;
          }
        })}
      </p>

      {/* <p>{description}</p> */}
    </div>
  );
};
