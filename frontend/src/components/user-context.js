import { createContext } from "react";
export const User = {
  user: {
    username: "",
    // password: "",
    id: "",
    name: "",
    type: ""
  }
};
export const userContext = createContext(User.user);
