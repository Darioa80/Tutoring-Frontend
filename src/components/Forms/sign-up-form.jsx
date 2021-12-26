import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../scss/wrap.scss";
import Input from "./Input";
import { AuthContext } from "./../../context/auth-context";
import { validation } from "../../util/validation";
import ErrorBox from "./error-box";
import { useError } from "../../util/error-hook";
import HTTPModal from "../HTTPModal";
import LoadingModal from "../loadingModal";

const axios = require("axios");


const SignUpForm = (props) => {
  const {httpError, HttpErrorDetected, CloseModal, loadingHttpResponse} = useError();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });
  const [disable, setDisable] = useState({ check: true, message: "" });
  const history = useHistory();
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });
  const auth = useContext(AuthContext);

  useEffect(() => {
    let check = false;
    let message = "";
    for (const [key, value] of Object.entries(error)) {
      if (value != "") {
        check = true;
        message = value;
        break;
      }
    }

    setDisable({ check, message });
  }, [error]);

  useEffect(() => {
    setError(validation(formData));
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const { value, name } = input;
    let newValue = { ...formData };

    newValue[name] = value;

    setFormData(newValue);
    setError(validation(newValue));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    loadingHttpResponse(true);
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}user/register`,
        {
          email: formData["email"],
          password: formData["password"],
          password2: formData["password2"],
          firstName: formData["firstName"],
          lastName: formData["lastName"],
          phoneNumber: formData["phoneNumber"],
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

  return (
    <div className="form-parent">
        {httpError.occured === "loading" && <LoadingModal/>}
        {httpError.occured === true && <HTTPModal show={httpError.occured} message={httpError.message} onClose={CloseModal} id={"delete-modal"} buttonID={"cancel"} /> }
      <form onSubmit={submitHandler} className="vertical-form-wrap">
        <h1>Sign Up</h1>

        <div className="wrap-signup-form-field">
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
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
              inputData={formData["email"]}
              placeholder="Enter a valid email."
            />
            <Input
              name="phoneNumber"
              label="Phone Number"
              handleChange={handleChange}
              inputData={formData["phoneNumber"]}
              placeholder=""
            />
          </div>
          <div className="row-form-fields-wrap">
            <Input
              name="password"
              label="Password"
              type="password"
              handleChange={handleChange}
              inputData={formData["password"]}
              placeholder="Minimum of 8 characters"
            />
            <Input
              name="password2"
              label="Confirm Password"
              type="password"
              handleChange={handleChange}
              inputData={formData["password2"]}
              placeholder="Minimum of 8 characters"
            />
          </div>
          {disable.check && <ErrorBox message={disable.message} />}

          <button
            type="submit"
            className={`sign-up-button ${disable.check ? "disabled" : ""}`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
