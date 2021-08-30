import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "../../scss/wrap.scss";
import Input from "./Input";
import { AuthContext } from "./../../context/auth-context";

const axios = require("axios");
const api = "http://localhost:8080/";

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const [error, setError] = useState({ check: false, message: "" });
  const auth = useContext(AuthContext);

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;
    console.log(newValue);
    setFormData(newValue);
  };

  const submitHandler = async (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      const result = await axios.post(
        api + "user/register",
        {
          email: formData["email"],
          password: formData["password"],
          firstName: formData["firstName"],
          lastName: formData["lastName"],
          phoneNumber: formData["phoneNumber"],
        },
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(result.data);
      history.push("/");
    } catch (err) {
      const { message } = err.response.data;
      setError({ check: true, message: message });
      console.log(message);
    }
  };

  return (
    <div className="form-parent">
      <form onSubmit={submitHandler} className="vertical-form-wrap">
        <h1>Sign Up</h1>

        <div className="wrap-signup-form-field">
          <div className="row-form-fields-wrap">
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              inputData={formData["email"]}
              placeholder="Enter a valid email."
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              inputData={formData["password"]}
              placeholder="Minimum of 8 characters"
            />
          </div>

          <div className="row-form-fields-wrap">
            <Input
              name="firstName"
              label="First Name"
              handleChange={handleChange}
              inputData={formData["firstName"]}
              placeholder=""
            />
            <Input
              name="lastName"
              label="Last Name"
              handleChange={handleChange}
              inputData={formData["lastName"]}
              placeholder=""
            />
          </div>
          <div className="row-form-fields-wrap">
            <Input
              name="phoneNumber"
              label="Phone Number"
              handleChange={handleChange}
              inputData={formData["phoneNumber"]}
              placeholder=""
            />
          </div>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
