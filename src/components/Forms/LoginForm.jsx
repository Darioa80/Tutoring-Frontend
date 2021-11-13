import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import "../../scss/wrap.scss";
import Input from "./Input";
import { AuthContext } from "./../../context/auth-context";
import ErrorBox from "./error-box";
import { validation } from "../../util/validation";
import { object } from "joi";

const axios = require("axios");

const api = "http://localhost:8080/";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const history = useHistory();
  const auth = useContext(AuthContext);

  const returnFirstErrors = (errors) => {
    let error = {
      error: false,
      message: "",
    };
    for (const [key, value] of Object.entries(errors)) {
      if (value != "") {
        error.error = true;
        error.message = value;
        break;
      }
    }
    return error;
  };

  useEffect(() => {
    console.log("hi");
    let result = returnFirstErrors(error);

    setMessage(result.message);
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();

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
      const { firstName, userID, token, email } = result.data;
      auth.login(firstName, userID, token, email);
      // auth.login(
      //   result.data.firstName,
      //   result.data.userID,
      //   result.data.token,
      //   result.data.email
      // );

      history.push("/");
    } catch (err) {
      const { message } = err.response.data;
      //setError({ check: true, message: message });
      setMessage(message);
    }

    //console.log(userData);
  };

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;
    //console.log(newValue);
    setFormData(newValue);
    setError(validation(newValue));
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
              type="email"
              handleChange={handleChange}
              inputData={formData["email"]}
              placeholder=""
            />
            <Input
              name="password"
              type="password"
              label="Password"
              handleChange={handleChange}
              inputData={formData["password"]}
            />
            {message !== "" && <ErrorBox message={message} />}
            <button
              type="submit"
              className={`
                ${
                  message
                    ? "login-form-button error-spacing"
                    : "login-form-button"
                } ${message !== "" ? " disabled" : ""}
                  `}
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
