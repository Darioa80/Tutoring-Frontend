import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Input from "./Input";
import { AuthContext } from "../../context/auth-context";
import { parseDate, ConvertTime } from "../../util/date-time";

const axios = require("axios");
const api = "http://localhost:8080/";

const RequestForm = (props) => {
  const selectedRef = useRef(null);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState();
  const [pricesObject, setPricesObject] = useState({});
  const [price, setPrice] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState({
    user_id: auth.userID,
    subject_id: props.subject_id,
    time: "",
    date: "",
    location: "",
    topics: "",
  });
  const [error, setError] = useState({ check: false, message: "" });
  let id_subjectName = {};

  const SetUpTimes = async (date) => {
    if (date) {
      try {
        const results = await axios.post(api + "requests/times", {
          date: new Date(date),
        });

        setTimes([...results.data.times]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(async () => {
    try {
      const results = await axios.get(api + "requests/subjects");
      console.log(results.data);
      id_subjectName = results.data[0];
      setSubjects(Object.values(id_subjectName));
      setPricesObject(results.data[1]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let requestObject = { ...formData };
    requestObject.user_id = auth.userID;
    setFormData({ ...requestObject });
  }, [subjects]);

  useEffect(() => {
    SetUpTimes(selectedDate);
  }, [selectedDate]);

  const submitHandler = async (e) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    };
    e.preventDefault();
    try {
      const result = await axios.post(api + "requests/", formData, {
        headers: headers,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
      // const { message } = err.response.data;
      // setError({ check: true, message: message });
      // console.log(message);
    }
  };

  const handleSelectChange = (e) => {
    let currentState = { ...formData };
    if (e.target.id == "subject") {
      currentState.subject_id = e.target.value;
      setFormData(currentState);

      setPrice(pricesObject[e.target.value]);
    }
    if (e.target.id == "time") {
      currentState.time = e.target.value;
      setFormData(currentState);
    }
  };

  useEffect(() => {
    let currentState = { ...formData };
    currentState.date = selectedDate;
    setFormData(currentState);
  }, [selectedDate]);

  return (
    <div className="form-parent">
      <form onSubmit={submitHandler} className="vertical-form-wrap">
        <h1>Tutoring Request</h1>

        <div className="wrap-signup-form-field">
          <div className="row-form-fields-wrap">
            <div className="flex-form-content">
              <label>Select Subject:</label>
              <select
                ref={selectedRef}
                id="subject"
                onChange={handleSelectChange}
              >
                <option value="" disabled selected></option>
                {subjects.map((value, index) => {
                  console.log(value);
                  return (
                    <option
                      key={"sub" + index}
                      value={index + 1}
                      selected={props.subject_id == index + 1 ? true : false}
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
              <label>Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
              />
              <label>Select Time:</label>
              <select id="time" onChange={handleSelectChange}>
                <option value="" disabled selected>
                  {selectedDate ? "" : "Choose date first"}
                </option>

                {times.map((value, index) => {
                  return (
                    <option key={"time" + index} value={value}>
                      {ConvertTime(value)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <hr />
          <span id="cost">{`Cost: $${price}`}</span>

          <button className="sign-up-button">Send Request</button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
