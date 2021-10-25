import React, { useState, useEffect, useContext } from "react";

import LogIn from "../components/Navigation/Login";
import { AuthContext } from "./../context/auth-context";
import AppointmentBlock from "./../components/appointment-block";
const axios = require("axios");
const api = "http://localhost:8080/";

const AppointmentsPage = () => {
  const auth = useContext(AuthContext);

  const [appointments, setAppoinments] = useState([]);

  const getAppointments = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    };
    try {
      const result = await axios.get(`${api}requests/user/${auth.userID}`, {
        headers: headers,
      });
      setAppoinments(result.data.apps);
    } catch (err) {
      console.log(err);
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
