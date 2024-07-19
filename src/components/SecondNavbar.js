import { AuthContext } from './AuthContext';
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/SecondNavbar.css";

const SecondNavbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentButton } = location.state || {};

    const handleClick = (buttonName) => {
        navigate(`/${buttonName}`, {state : { currentButton: buttonName}});
    };

    const handleSignOutClick = async () => {
        // Make a request to the /signout route
        const response = await fetch('http://localhost:5000/signout', {
          method: 'POST',
          credentials: 'include',
        });
      
        if (response.ok) {
          // Set isLoggedIn state to false
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.error('Sign out failed');
        }
    };

    return (
        <div className="dashboard">
            <button className="dash-link" onClick={() => handleClick("Profile")}>
            {currentButton === 'Profile' && "> "}Profile</button>
            <button className="dash-link" onClick={() => handleClick("Library")}>
            {currentButton === 'Library' && "> "}Library</button>
            <button className="dash-link" onClick={() => handleClick("Settings")}>
            {currentButton === 'Settings' && "> "}Settings</button>
            <button className="dash-link" onClick={handleSignOutClick}>
            {currentButton === 'SignOut' && "> "}Sign Out</button>
        </div>
    );
};

export default SecondNavbar;