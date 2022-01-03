import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "./../context/auth-context";
import AppointmentBlock from "./../components/appointment-block";
import { useError } from "../util/error-hook";
import HTTPModal from "../components/HTTPModal";
import LoadingModal from "../components/loadingModal";

const axios = require("axios");
const api = "http://localhost:8080/";

const AppointmentsPage = () => {
  const {httpError, HttpErrorDetected, CloseModal, loadingHttpResponse} = useError();
  const auth = useContext(AuthContext);

  const [appointments, setAppoinments] = useState([]);

  const getAppointments = async () => {
    loadingHttpResponse(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    };
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}requests/user/${auth.userID}`, {
        headers: headers,
      });
      setAppoinments(result.data.apps);
      loadingHttpResponse(false);
    } catch (err) {
      HttpErrorDetected(err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const updateDelete = (id) => {
    let apps = [...appointments];

    apps = apps.filter((app) => app.Request_ID != id);

    setAppoinments([...apps]);
  };

  return (
    <React.Fragment>
      <div className="appointments-wrapper">
        <div className="appointments-outer">
        {httpError.occured === "loading" && <LoadingModal/>}
        {httpError.occured === true && <HTTPModal show={httpError.occured} message={httpError.message} onClose={CloseModal} id={"delete-modal"} buttonID={"cancel"} /> }
          <h1>
            {`You have `}
            <span>{appointments.length}</span> {`tutoring sessions coming up!`}
          </h1>
          <div className="appointments-display">
            {appointments.map((value, index) => {
              return (
                <AppointmentBlock
                  id={value.Request_ID}
                  subject_name={value.Subject_Name}
                  date={value.Date}
                  time={value.Time}
                  updatePage={updateDelete}
                  subject_id={value.Subject_ID}
                  GetAppointments={getAppointments}
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppointmentsPage;
