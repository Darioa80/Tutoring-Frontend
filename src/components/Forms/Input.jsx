import React from "react";

const Input = (props) => {
  const { name, label, message, inputData, handleChange, placeholder } = props;

  return (
    <React.Fragment>
      <div className="flex-form-content">
        <label>{label}</label>
        <input
          name={name}
          type="text"
          onChange={handleChange}
          value={inputData}
          placeholder={placeholder}
        ></input>
      </div>
      {message && <p>{message}</p>}
    </React.Fragment>
  );
};

export default Input;
