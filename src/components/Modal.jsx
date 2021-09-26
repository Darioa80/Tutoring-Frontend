import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  console.log(props);
  if (props.show) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div id={props.id} className="modal-outer">
          <div className="modal-message">
            <h6>{props.message}</h6>
          </div>
          <div className="modal-buttons">
            <button onClick={props.onClose} id="cancel">
              No
            </button>
            <button onClick={props.handleSubmit} id="confirm">
              Yes
            </button>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
export default Modal;
