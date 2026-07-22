import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const decoded = jwtDecode(token);

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