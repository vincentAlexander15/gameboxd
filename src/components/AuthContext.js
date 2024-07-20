// AuthContext.js
import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch('http://localhost:5000/checkLoggedIn', {
        credentials: 'include',
      });
      setIsLoggedIn(response.ok);
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
        const response = await fetch('http://localhost:5000/getCurrentUser', {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.username);
         } else {
            console.error('Failed to retrieve username');
        }
    };
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
