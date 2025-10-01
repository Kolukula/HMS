import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const logout = () => {
  localStorage.removeItem("token");   // remove JWT
  localStorage.removeItem("user");    // optional, if you stored user info
  window.location.href = "/login";    // redirect
};


export const setToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
