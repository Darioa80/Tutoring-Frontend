import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import "../../scss/wrap.scss";
import Input from "./Input";
import { AuthContext } from "./../../context/auth-context";
import ErrorBox from "./error-box";
import { validation } from "../../util/validation";
import { useError } from "../../util/error-hook";
import HTTPModal from "../HTTPModal";
import LoadingModal from "../loadingModal";

const axios = require("axios");



const LoginForm = (props) => {
  const {httpError, HttpErrorDetected, CloseModal, loadingHttpResponse} = useError();
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
      if (value !== "") {
        error.error = true;
        error.message = value;
        break;
      }
    }
    return error;
  };

  useEffect(() => {
    let result = returnFirstErrors(error);

    setMessage(result.message);
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      loadingHttpResponse(true);
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}user/login`,
        {
          email: formData["email"],
          password: formData["password"],
        },
        {
          "Content-Type": "application/json",
        }
      );

      const { firstName, userID, token, email } = result.data;
      auth.login(firstName, userID, token, email);
      history.push("/");
    } catch (err) {
      HttpErrorDetected(err);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;
    setFormData(newValue);
    setError(validation(newValue));
  };

  return (
    <React.Fragment>
      <div className="form-parent slim-form">
        {httpError.occured === "loading" && <LoadingModal/>}
        {httpError.occured === true && <HTTPModal show={httpError.occured} message={httpError.message} onClose={CloseModal} id={"delete-modal"} buttonID={"cancel"} /> }
        <form onSubmit={submitHandler} className="vertical-form-wrap">
          <h1>Log in</h1>
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
