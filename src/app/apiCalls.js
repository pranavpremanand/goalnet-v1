import axios from "axios";

export const baseUrl = "http://localhost:3000";

// login
export const login = (data) => {
  return axios.post(`${baseUrl}/api/auth/login`, data);
};

// logout
export const logout = () => {
  return axios.post(`${baseUrl}/api/auth/logout`);
};
