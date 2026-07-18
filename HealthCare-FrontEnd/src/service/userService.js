import api from "./api.js";

export const signup = (user) => {
  return api.post("/auth/register", user).then((response) => response.data);
};