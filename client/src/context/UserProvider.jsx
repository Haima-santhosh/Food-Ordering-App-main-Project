import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import api from "../api/axios"; 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from backend 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/profile", { withCredentials: true });
        if (response.data?.user) {
          setUser(response.data.user);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.log("User not authenticated", err);
        setUser(null);
        localStorage.removeItem("userData");
      }
    };

    fetchUser();
  }, []);

  // Login function
  const signin = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Logout function 
  const signout = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout failed:", err);
    }
    setUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ user, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};
