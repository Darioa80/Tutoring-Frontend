import React, { useState, useEffect, useContext } from "react";

import DatePicker from "react-datepicker";
import Modal from "./Modal";
import { ConvertTime } from "./../util/date-time";

import { AuthContext } from "./../context/auth-context";
import ErrorBox from "./Forms/error-box";
import { validateEmpty, validateSubmission } from "./../util/validation";

const axios = require("axios");
const api = "http://localhost:8080/";

const EditApp = (props) => {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState({
    user_id: auth.userID,
    subject_id: props.subject_id,
    time: "",
    date: "",
    location: "virtual",
    topics: "N/A",
  });
  //const [message, setMessage] = useState({ time: "new", date: "new" });
  const [message, setMessage] = useState("");
  const [httpRequest, setHttpRequest] = useState({sent: false, message: "Are you sure you want to update the current tutoring session?"});
  

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

  useEffect(() => {
    SetUpTimes(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    let currentState = { ...formData };
    currentState.date = selectedDate;
      setFormData(currentState);
  }, [selectedDate]);

  useEffect(() => {
   const errors = validateSubmission(formData);
   let message = "No Errors";
   console.log(errors);
   for (const [key, value] of Object.entries(errors)) {
     if(errors[key].error == true){
        message = errors[key].message;
        break;
     }
   }
   setMessage(message);
  }, [formData]);



  const handleSelectChange = (e) => {
    const error = validateEmpty(e.target.value, "Date");
    if (error === "") {
      let currentState = { ...formData };
      currentState.time = e.target.value;
      setFormData(currentState);
    }
  };

  const handleEdit = () => {
    setFormData({
      user_id: auth.userID,
      subject_id: props.subject_id,
      time: "",
      date: "",
      location: "",
      topics: "",
    });

    props.handleEdit();
  };

  const openModal = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    };
     setHttpRequest({sent: true, message: "Sending your request...."});
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_API_URL}requests/${props.req_id}`,
        formData,
        { headers: headers }
      );
      console.log("Request was sent");
      setTimeout(()=>setHttpRequest({sent: true, message: "Request was sent succesfully!"}), 2500);
     
    } catch (err) {
      setTimeout(()=>setHttpRequest({sent: true, message: "Request failed, please try again later."}), 2500);
    }
     handleEdit();
    setIsOpen(!isOpen);
    props.GetAppointments();
  };

  return (
    <React.Fragment>
      <Modal
        editMode={httpRequest.sent}
        show={isOpen}
        handleSubmit={handleSubmit}
        onClose={openModal}
        message={
         httpRequest.message
        }
      />
      <form id="edit-app-form">
        <h6>{"Date: "}</h6>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
        />
        <p>
          {`Current Session Date:`} <span>{`${props.date}`}</span>
        </p>
        <h6>{"Time: "}</h6>
        <select id="time" onChange={handleSelectChange}>
          <option value="" disabled selected>
            {`Choose the date first.`}
          </option>

          {times.map((value, index) => {
            return (
              <option key={"time" + index} value={value}>
                {ConvertTime(value)}
              </option>
            );
          })}
        </select>
        <p>
          {`Current Session Time:`} <span>{`${props.time}`}</span>{" "}
        </p>
      </form>
      {message !== "No Errors" && <ErrorBox message={message} />}
      <div className="appointment-block-buttons-wrapper">
        <button onClick={handleEdit} id="cancel">
          Cancel Edit
        </button>
        <button
          className={message !== "No Errors" ? "disabled" : ""}
          onClick={openModal}
          id="submit"
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default EditApp;
