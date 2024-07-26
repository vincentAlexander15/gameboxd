import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      const loggedInResponse = await fetch('http://localhost:5000/checkLoggedIn', {
        credentials: 'include',
      });
      setIsLoggedIn(loggedInResponse.ok);

      if (loggedInResponse.ok) {
        const userResponse = await fetch('http://localhost:5000/getCurrentUser', {
          method: 'POST',
          credentials: 'include',
        });
        if (userResponse.ok) {
          const data = await userResponse.json();
          setCurrentUser(data.username);
        } else {
          console.error('Failed to retrieve username');
        }
      }

      setLoading(false); // Auth check is complete
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your preferred loading UI
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
