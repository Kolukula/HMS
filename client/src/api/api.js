// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api" || process.env.BACKEND_URL || "https://hms-git-main-kumar-devi-prasad-kolukulas-projects.vercel.app/api",
  withCredentials: true, // needed if you use cookies
});

// Optional helper to set auth token
export const setToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export default API;
