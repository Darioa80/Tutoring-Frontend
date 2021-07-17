import { createContext } from "react";

export const AuthContext = createContext({
  email: "",
  userID: null,
  token: null,
  firstName: "",
  //isLoggedIn: false,
});
