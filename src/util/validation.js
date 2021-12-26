export const validateEmpty = (string, label) => {
  let error = "";
  const label_conversion = {
    email: "Email",
    password: "Password",
    password2: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    subject_id: "Subject",
    time: "Time",
    date: "Date",
  };
  if (string === "" || string == undefined) {
    error = `${label_conversion[label]} is required.`;
  }
  return error;
};

export const validateSubmission = (formValues) => {
  let errors = {};
  for (const [key, value] of Object.entries(formValues)) {
    const errorString = validateEmpty(value, key);

    errors[key] = { error: errorString == "" ? false : true, message: errorString };

    if (key == "date" && value !== "") {
      const today = new Date();
      if (new Date(value).getTime() <= today.getTime()) {
        errors[key].error = true;
        errors[key].message = `Cannot choose a date before today: ${today}`;
      }
    }

  }
  console.log(errors);
  return errors;
};

export const validation = (formValues) => {
  let errors = {};

  const validatePassword = (password) => {
    let password_error = "";
    password_error = validateEmpty(password, "Password");
    if (password.length < 8) {
      password_error = "Password should be a minimum of 8 characters long.";
    }
    return password_error;
  };

  const validatePassword2 = (password, password2) => {
    let password2_error = "";
    password2_error = validateEmpty(password2, "Confirm Password");
    if (password2.length < 8) {
      password2_error = "Password should me a minimum of 8 characters long.";
    }
    if (password2 !== password) {
      password2_error = "Passwords do not match";
    }
    return password2_error;
  };

  const validatePhone = (phoneNumber) => {
    const reg = new RegExp("^[0-9]*$");
    let error = "";
    if (!reg.test(phoneNumber)) {
      error = "Invalid Phone Number";
    }
    if (phoneNumber.length < 10) {
      error = "Incomplete Phone Number";
    }
    return error;
  };

  for (const [key, value] of Object.entries(formValues)) {
    errors[key] = validateEmpty(value, key);
  }

  if (formValues.email) {
    errors.email = validateEmpty(formValues.email, "Email");
  }
  if (formValues.password) {
    errors.password = validatePassword(formValues.password);
  }
  if (formValues.password2) {
    errors.password2 = validatePassword2(
      formValues.password2,
      formValues.password
    );
  }
  if (formValues.phoneNumber) {
    errors.phoneNumber = validatePhone(formValues.phoneNumber);
  }
  console.log("errors", errors);
  return errors;
};
