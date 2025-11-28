import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage safely
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userData"));
      if (storedUser) setUser(storedUser);
    } catch (err) {
      console.warn("Invalid userData in localStorage. Clearing it.");
      localStorage.removeItem("userData");
      console.log(err);
      
    }
  }, []);

  // Login function
  const signin = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Logout function
  const signout = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ user, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
};
