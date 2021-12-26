import { useState, useEffect, useLayoutEffect, useCallback} from "react";


export const useAuth = () => {


  // const [userInfo, setUserInfo] = useState({
  //   email: "",
  //   userID: "",
  //   token: "",
  //   firstName: "",
  // });

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userData")) || {
    email: "",
    userID: "",
    token: "",
    firstName: "",
  });


  const login = useCallback((firstName, userID, token, email) => {
    //const { firstName, userId, token, email } = userData;

    setUserInfo({
      email, userID, token, firstName
    })
    const tokenExpirationDate = new Date(Date.now() + 1000 * 60 * 60);
    const userData = {};
    localStorage.setItem(
      "userData",
      JSON.stringify({
        firstName,
        userID: userID,
        token: token,
        email,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    
  },[]);

  const logout = useCallback(() => {
    
    setUserInfo({
      email: "",
      userID: "",
      token: "",
      firstName: "",
    });
    localStorage.removeItem("userData");
    
  },[]);

  useLayoutEffect(() => {
    //will run once after the render cycle and allows the user to stay logged in

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
        storedData.userID,
        storedData.token,
        storedData.email
      );
    }
    else{
      logout();
    }

  }, []);
  return { login, logout, userInfo };
};
