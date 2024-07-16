// AuthContext.js
import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch('http://localhost:5000/checkLoggedIn', {
        credentials: 'include',
      });
      setIsLoggedIn(response.ok);
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
