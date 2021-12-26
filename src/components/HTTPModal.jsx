import React from "react";
import ReactDOM from "react-dom";

const HTTPModal = (props) => {
  if( props.show ){
  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div id={props.id} className="modal-outer">
          <div className="modal-message">
            <h6>{props.message}</h6>
          </div>
            <div className="modal-buttons">
              <button onClick={props.onClose} id={props.buttonID}>
                {props.buttonMessage || 'Close'}
              </button>
            </div>     
      </div>
    </div>,
    document.getElementById("modal")
  );
  }
};

export default HTTPModal;
