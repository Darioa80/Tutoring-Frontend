import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const login = (firstName, userId, token, email) => {
    //const { firstName, userId, token, email } = userData;

    setToken(token);
    setUserID(userId);
    setEmail(email);
    setFirstName(firstName);

    const tokenExpirationDate = new Date(Date.now() + 1000 * 60 * 60);
    const userData = {};
    localStorage.setItem(
      "userData",
      JSON.stringify({
        firstName,
        userId: userId,
        token: token,
        email,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    console.log("log - in - timing");
  };

  const logout = () => {
    console.log("log out");
    setToken(null);
    setUserID(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    //will run once after the render cycle and allows the user to stay logged in
    console.log("hi");
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      //compares expiration date to current time
      console.log("inside userEffect", storedData);
      login(
        storedData.firstName,
        storedData.userId,
        storedData.token,
        storedData.email
      );
    }
  }, []);
  return { login, logout, token, userID, email, firstName };
};