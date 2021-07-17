import React from "react";

const ErrorBox = (props) => {
  const { message } = props;

  return (
    <div className="error-wrap">
      <p>{message}</p>
    </div>
  );
};

export default ErrorBox;
