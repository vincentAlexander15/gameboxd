// AuthContext.js
import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
