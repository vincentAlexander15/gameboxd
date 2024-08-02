import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser') || '');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const loggedInResponse = await fetch('http://localhost:5000/checkLoggedIn', {
          credentials: 'include',
        });
        const loggedInData = await loggedInResponse.json();
        setIsLoggedIn(loggedInData.authenticated);
  
        if (loggedInData.authenticated) {
          const userResponse = await fetch('http://localhost:5000/getCurrentUser', {
            method: 'POST',
            credentials: 'include',
          });
          if (userResponse.ok) {
            const data = await userResponse.json();
            if (!currentUser){
              setCurrentUser(data.username);
              localStorage.setItem('currentUser', data.username);
            }
          } else {
            console.error('Failed to retrieve username');
          }
        }
      } catch (error) {
        console.error('An error occurred while checking authentication status:', error);
      } finally {
        setLoading(false); // Auth check is complete
      }
    };
    checkAuthStatus();
  }, [currentUser]);
  
  useEffect(() => {
    localStorage.setItem('currentUser', currentUser);
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
