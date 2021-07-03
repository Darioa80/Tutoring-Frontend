import React from "react";

const Input = (props) => {
  const { name, label, id, inputData, handleChange } = props;

  return (
    <React.Fragment>
      <div className="wrap-form-field">
        <label>{label}</label>
        <input
          name={name}
          type="text"
          onChange={handleChange}
          value={inputData}
        ></input>
      </div>
    </React.Fragment>
  );
};

export default Input;
