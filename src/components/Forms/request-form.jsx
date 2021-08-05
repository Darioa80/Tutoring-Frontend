import React, { useState, useEffect } from "react";

import Input from "./Input";
const axios = require("axios");
const api = "http://localhost:8080/";

const requestKey = 10;

const RequestForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    user_id: 0,
    subject_id: 0,
    time: "",
    date: "",
    location: "",
    topics: "",
  });
  const [error, setError] = useState({ check: false, message: "" });

  useEffect(async () => {
    console.log("hi");
    try {
      const results = await axios.get(api + "request/subjects");
      console.log(results.data.subjects);
      setSubjects([...results.data.subjects]);
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <div className="form-parent">
      <form className="vertical-form-wrap">
        <h1>Tutoring Request</h1>

        <div className="wrap-signup-form-field">
          <div className="row-form-fields-wrap">
            <div className="flex-form-content">
              <label>Select Subject:</label>
              <select>
                {subjects.map((value, index) => {
                  return (
                    <option key={requestKey + index} value={index + 1}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button className="sign-up-button">Send Request</button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
