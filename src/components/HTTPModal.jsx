import React from "react";
import ReactDOM from "react-dom";

const HTTPModal = (props) => {
  if (props.show) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal-outer">
          <div className="modal-message">
            <h6>{props.message}</h6>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default HTTPModal;
