import React, { useState, useEffect, useContext, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../context/auth-context";
import { ConvertTime } from "../../util/date-time";
import { validateSubmission } from "../../util/validation";
import ErrorBox from "./error-box";
import { useError } from "../../util/error-hook";
import HTTPModal from "../HTTPModal";
import LoadingModal from "../loadingModal";

const axios = require("axios");


const RequestForm = (props) => {
  const {httpError, HttpErrorDetected, CloseModal, loadingHttpResponse} = useError();
  const selectedRef = useRef(null);
  const auth = useContext(AuthContext);
  const [show, setShow] = useState(false);
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
    quantity: 1
  });
  const [error, setError] = useState({
    subject_id: { error: false, message: "" },
    time: { error: false, message: "" },
    date: { error: false, message: "" },
  });
  const [disable, setDisable] = useState({ disable: true, message: "" });
 
  

  const SetUpTimes = async (date) => {
    if (date) {
      try {
        const results = await axios.post(`${process.env.REACT_APP_API_URL}requests/times`, {
          date: new Date(date),
        });

        setTimes([...results.data.times]);
      } catch (err) {
        HttpErrorDetected(err);
      }
    }
  };

  useEffect(() => {
    let disable = false;
    let message = "";
    for (const [key, value] of Object.entries(error)) {
      if (value.error === true) {
        disable = true;
        message = value.message;
        break;
      }
    }

    setDisable({ disable, message });
  }, [error]);

  useEffect(() => {

    const { subject_id, time, date } = formData;
    setError(validateSubmission({ subject_id, date, time }));
  }, [formData]);

  useEffect(() => {
    const fetchSubjects = async ()=>{
      loadingHttpResponse(true);
      let id_subjectName;
      try {
        const results = await axios.get(`${process.env.REACT_APP_API_URL}requests/subjects`);
        id_subjectName = results.data[0];
        setSubjects(Object.values(id_subjectName));
        setPricesObject(results.data[1]);
        loadingHttpResponse(false);
      } catch (err) {
        HttpErrorDetected(err);
      }
    }
    fetchSubjects();
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
    e.preventDefault();
    loadingHttpResponse(true);
    localStorage.setItem(
      "requestData",
      JSON.stringify({
        user_id: formData.user_id,
        subject_id: formData.subject_id,
        time: formData.time,
        date: formData.date,
      })
    );
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    };
    
    
    try {
     const result = await axios.post(`${process.env.REACT_APP_API_URL}requests/create-checkout-session`, formData, {
        headers: headers,
      });
      window.location.href = result.data.url;

    } catch (err) {
      HttpErrorDetected(err);
    }

  };

  useEffect(() =>{
    if(props.subject_id !== ""){
      setPrice(pricesObject[props.subject_id - 1]);
    }
    else{
      setPrice(0);
    }
  },[pricesObject])

  const handleSelectChange = (e) => {
    let currentState = { ...formData };
    if (e.target.id === "subject") {
      currentState.subject_id = e.target.value;
      setFormData(currentState);
      setPrice(pricesObject[e.target.value]);
    }
    if (e.target.id === "time") {
      currentState.time = e.target.value;
      setFormData(currentState);
    }
  };

  useEffect(() => {
    let currentState = { ...formData };
    currentState.date = selectedDate;
    setFormData(currentState);
  }, [selectedDate]);

  if (!show) {
    return (
      <div className="form-parent">
        {httpError.occured === "loading" && <LoadingModal/>}
        {httpError.occured === true && <HTTPModal show={httpError.occured} message={httpError.message} onClose={CloseModal} id={"delete-modal"} buttonID={"cancel"} /> }
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
                    return (
                      <option
                        key={"sub" + index}
                        value={index + 1}
                        selected={props.subject_id === index + 1 ? true : false}
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
            <span id="cost">{`Cost: $${price || 0}`}</span>
            {disable.message !== "" && <ErrorBox message={disable.message} />}
            <button
              className={`sign-up-button ${disable.disable ? `disabled` : ``}`}
              disabled={disable.disable}
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    );
  } else {
  }
};

export default RequestForm;
