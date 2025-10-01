import { createContext, useState, useEffect } from "react";
import { setToken } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setAuthToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
