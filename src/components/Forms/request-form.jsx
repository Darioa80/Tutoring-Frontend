import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Input from "./Input";
const axios = require("axios");
const api = "http://localhost:8080/";

const RequestForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //let subjects = [];
  const [subjects, setSubjects] = useState([]);
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState({
    user_id: 0,
    subject_id: 0,
    time: "",
    date: "",
    location: "",
    topics: "",
  });
  const [error, setError] = useState({ check: false, message: "" });

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
    console.log("hi");
    try {
      const results = await axios.get(api + "request/subjects");
      setSubjects([...results.data.subjects]);
      //subjects = [...results.data.subjects];
    } catch (err) {
      console.log(err);
    }
    //SetUpTimes(selectedDate);
  }, []);

  useEffect(() => {
    SetUpTimes(selectedDate);

    // try {
    //   const results = await axios.post(api + "request/times", {
    //     date: selectedDate,
    //   });

    //   const displayTimes = FormatAvailableTimes(results.data.times);
    //   console.log(displayTimes);
    //   setTimes([...displayTimes]);
    // } catch (err) {
    //   console.log(err);
    // }
  }, [selectedDate]);

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
              <select>
                {times.map((value, index) => {
                  return (
                    <option key={"time" + index} value={index + 1}>
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
