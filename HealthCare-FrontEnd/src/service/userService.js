import api from "./api.js";

export const signup = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};