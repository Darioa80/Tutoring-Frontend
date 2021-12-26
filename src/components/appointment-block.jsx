import React, { useState, useEffect, useContext } from "react";
import { parseDate, ConvertTime } from "../util/date-time";

import EditApp from "./edit-app";
import { AuthContext } from "./../context/auth-context";
import Modal from "./Modal";
const axios = require("axios");
const api = "http://localhost:8080/";

const AppointmentBlock = (props) => {
  const auth = useContext(AuthContext);
  const [deleteBlock, setDeleteBlock] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const deleteAppointment = async () => {
      if (deleteBlock === true) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        };
        try {
          const result = await axios.delete(`${api}requests/${props.id}`, {
            headers: headers,
          });
          props.updatePage(props.id);
        } catch (err) {
          console.log(err);
        }
      }
    };
    deleteAppointment();
  }, [deleteBlock]);

  const handleDelete = () => {
    setDeleteBlock(true);
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="appointment-block-wrapper">
      <div className="appointment-block-flex">
        {editMode && (
          <React.Fragment>
            <h4>{props.subject_name}</h4>
            <div className="appointment-block-padding">
              <EditApp
                date={parseDate(props.date)}
                time={ConvertTime(props.time)}
                req_id={props.id}
                subject_id={props.subject_id}
                handleEdit={handleEdit}
                GetAppointments={props.GetAppointments}
              />
            </div>
          </React.Fragment>
        )}
        {!editMode && (
          <React.Fragment>
            <Modal
              id="delete-modal"
              show={isOpen}
              handleSubmit={handleDelete}
              onClose={() => {
                setIsOpen(!isOpen);
              }}
              message={"Are you sure you want to cancel this tutoring session?"}
            />
            <h4>{props.subject_name}</h4>
            <div className="appointment-block-padding">
              <h6>
                {`Date: `}
                <p>{parseDate(props.date)}</p>
              </h6>

              <h6>
                {`Time: `}
                <p>{ConvertTime(props.time)}</p>
              </h6>
              <h6>
                {`Location: `} <p>{`Virtual`}</p>
              </h6>
            </div>
            <div className="appointment-block-buttons-wrapper">
              <button onClick={handleEdit} id="edit">
                Edit Appointment
              </button>
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                id="cancel"
              >
                Cancel Appointment
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default AppointmentBlock;
