import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage safely
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    const storedUser = savedUser ? JSON.parse(savedUser) : null;
    if (storedUser) setUser(storedUser);
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
