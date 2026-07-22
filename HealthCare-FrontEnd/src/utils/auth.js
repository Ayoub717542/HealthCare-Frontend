import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  // 1. get the token from where you saved it after login
  const token = localStorage.getItem("token");

  // 2. if there's no token, there's no logged-in user
  if (!token) {
    return null;
  }

  // 3. decode it back into the JSON you saw on jwt.io
  const decoded = jwtDecode(token);

  // 4. decoded.authorities is the array we saw:
  //    ["patient:...", "patient:...", "ROLE_PATIENT"]
  if (decoded.authorities.includes("ROLE_PATIENT")) {
    return "PATIENT";
  }

  if (decoded.authorities.includes("ROLE_ADMIN")) {
    return "ADMIN";
  }

  if (decoded.authorities.includes("ROLE_MEDECIN")) {
    return "MEDECIN";
  }

  return null;
}