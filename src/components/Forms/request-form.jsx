import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Input from "./Input";
const axios = require("axios");
const api = "http://localhost:8080/";

const RequestForm = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [pricesObject, setPricesObject] = useState({});
  const [price, setPrice] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState({
    user_id: 0,
    subject_id: 0,
    time: "",
    date: "",
    location: [],
    topics: "",
  });
  const [error, setError] = useState({ check: false, message: "" });
  let id_subjectName = {};
  let id_subjectRate = {};

  const FormatAvailableTimes = (dateArray) => {
    const timeMap = {
      "06:00:00": "6:00 am",
      "07:00:00": "7:00 am",
      "08:00:00": "8:00 am",
      "09:00:00": "9:00 am",
      "10:00:00": "10:00 am",
      "11:00:00": "11:00 am",
      "12:00:00": "12:00 pm",
      "13:00:00": "1:00 pm",
      "14:00:00": "2:00 pm",
      "15:00:00": "3:00 pm",
      "16:00:00": "4:00 pm",
      "17:00:00": "5:00 pm",
      "18:00:00": "6:00 pm",
      "19:00:00": "7:00 pm",
      "20:00:00": "8:00 pm",
      "21:00:00": "9:00 pm",
      "22:00:00": "10:00 pm",
    };
    let formattedTimes = [];
    dateArray.map((value, index) => {
      formattedTimes.push(timeMap[value]);
    });
    return formattedTimes;
  };

  const SetUpTimes = async (date) => {
    console.log(date);
    try {
      const results = await axios.post(api + "request/times", {
        date: new Date(date),
      });

      const displayTimes = FormatAvailableTimes(results.data.times);
      console.log(displayTimes);
      setTimes([...displayTimes]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    try {
      const results = await axios.get(api + "request/subjects");

      id_subjectName = results.data[0];

      setSubjects(Object.values(id_subjectName));
      setPricesObject(results.data[1]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    SetUpTimes(selectedDate);
  }, [selectedDate]);

  const submitHandler = async () => {
    try {
      const result = await axios.post(api + "request/", {});
    } catch (err) {
      const { message } = err.response.data;
      setError({ check: true, message: message });
      console.log(message);
    }
  };

  const handleSelectChange = (e) => {
    let currentState = { ...formData };
    if (e.target.id == "subject") {
      currentState.subject_id = e.target.value;
      setFormData(currentState);
      console.log(id_subjectRate);
      setPrice(pricesObject[e.target.value]);
    }
    if (e.target.id == "time") {
      console.log("time");
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
              <select id="subject" onChange={handleSelectChange}>
                <option value="" disabled selected></option>
                {subjects.map((value, index) => {
                  return (
                    <option key={"sub" + index} value={index + 1}>
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
                <option value="" disabled selected></option>

                {times.map((value, index) => {
                  return (
                    <option key={"time" + index} value={value}>
                      {value}
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
