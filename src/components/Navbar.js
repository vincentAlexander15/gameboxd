// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import loggedOutImage from '../images/loggedOut.png';
import loggedInImage from '../images/loggedIn.png';

const Navbar = () => {
  const [inputValue, setInputValue] = useState(''); // state for the input field
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state for the login status
  const [dropdownOpen, setDropdownOpen] = useState(false); // state for the dropdown menu

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // update inputValue when the input field changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent the form from refreshing the page
    console.log('Search:', inputValue); // replace this with your search logic
  };

  const handleImageClick = () => {
    setDropdownOpen(!dropdownOpen); // toggle the dropdown menu when the image is clicked
  };

  // components/Navbar.js
// ... other code ...

return (
    <nav className="navbar">
      <Link to="/">Gameboxd</Link>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {isLoggedIn ? (
        null
        ) : <Link to="/dashboard">Create an account</Link>}
      <div className="profile-menu">
        <img
          src={isLoggedIn ? loggedInImage : loggedOutImage} 
          alt="Profile" 
          onClick={handleImageClick} 
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="profile-link">Profile</Link>
            <Link to="/settings">Settings</Link>
            {isLoggedIn ? (
              <Link to="/logout">Sign out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
            <Link to="/about">About</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
