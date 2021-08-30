import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import "../../scss/wrap.scss";
import Input from "./Input";
import { AuthContext } from "./../../context/auth-context";
import ErrorBox from "./error-box";

const axios = require("axios");

const api = "http://localhost:8080/";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ check: false, message: "" });
  const history = useHistory();
  const auth = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(auth);
    let userData = "";

    try {
      const result = await axios.post(
        api + "user/login",
        {
          email: formData["email"],
          password: formData["password"],
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(result.data);

      auth.login(
        result.data.firstName,
        result.data.userID,
        result.data.token,
        result.data.email
      );

      history.push("/");
    } catch (err) {
      const { message } = err.response.data;
      setError({ check: true, message: message });
      console.log(message);
    }

    //console.log(userData);
  };

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;
    //console.log(newValue);
    setFormData(newValue);
  };

  return (
    <React.Fragment>
      <div className="form-parent">
        <form onSubmit={submitHandler} className="vertical-form-wrap">
          <h1>Log in to your account</h1>
          <div className="wrap-login-form-field">
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              inputData={formData["email"]}
              placeholder=""
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              inputData={formData["password"]}
            />
            {error.check && <ErrorBox message={error.message} />}
            <button
              className={
                error.check
                  ? "login-form-button error-spacing"
                  : "login-form-button"
              }
            >
              Log in
            </button>
            <span>
              or <Link to="/signup">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
