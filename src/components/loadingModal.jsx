import React, {useState} from "react";
import ReactDOM from "react-dom";

const LoadingModal = (props) => {

    
        return ReactDOM.createPortal(
        <div className="modal-wrapper">
            <div id={props.id} className="modal-outer">
               
                <h2 style={{padding: "3rem" }}>Loading...</h2>
            </div>
        </div>,
        document.getElementById("modal")
        );
    
};

export default LoadingModal;