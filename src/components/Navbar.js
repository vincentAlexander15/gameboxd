// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling
import loggedOutImage from '../images/loggedOut.jpg'; // import your logged out image
import loggedInImage from '../images/loggedIn.jpg'; // import your logged in image

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

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <img 
        src={isLoggedIn ? loggedInImage : loggedOutImage} 
        alt="Profile" 
        onClick={handleImageClick} 
      />
      {dropdownOpen && (
        <div className="dropdown-menu">
          {/* Add your dropdown menu items here */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
