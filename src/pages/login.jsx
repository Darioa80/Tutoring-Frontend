import React, { useState } from "react";

import "../scss/wrap.scss";
import Input from "../components/Forms/Input";
import LoginForm from "../components/Forms/LoginForm";

const Login = () => {
  return (
    <div className="center-wrapper">
      <LoginForm />
    </div>
  );
};

export default Login;
