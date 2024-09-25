// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Load user data from localStorage or sessionStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };