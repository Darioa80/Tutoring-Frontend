import React, { useState } from "react";

import "../../scss/wrap.scss";
import Input from "./Input";
const axios = require("axios");

const api = "http://localhost:8080/";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hi");
    axios.post(api + "user/login", {
      email: formData["email"],
      password: formData["password"],
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;
    console.log(newValue);
    setFormData(newValue);
  };

  return (
    <div className="form-parent">
      <form onSubmit={submitHandler}>
        <h1>Log in</h1>
        <Input
          name="email"
          label="Email"
          handleChange={handleChange}
          inputData={formData["email"]}
        />
        <Input
          name="password"
          label="Password"
          handleChange={handleChange}
          inputData={formData["password"]}
        />

        <button>Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
