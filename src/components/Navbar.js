// components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import '../fonts/fonts.css';
import loggedInImage from '../images/loggedIn.png';

const Navbar = () => {
  const [inputValue, setInputValue] = useState(''); // state for the input field
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state for the login status
  const [profileOpen, setProfileOpen] = useState(false); // state for the dropdown menu
  const [signInOpen, setSignInOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  const handleSubmit = (event) => {
    if (inputValue !== null && inputValue !== '') {
      event.preventDefault();
      navigate('/DataPage', {state : { searchQuery: inputValue}});
    }
  };

  const handleProfileClick = (num) => () => {
    if (num) {
      setProfileOpen(!profileOpen);
    } else {
      setSignInOpen(!signInOpen);
    }
  };

  return (
    <nav className="navbar">
      <Link className='title' to="/">Gameboxd</Link>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          id='search-input'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button id="search-icon" type="submit">
          <svg style={{ width: '24px', height: '24px'}} viewBox= '0 0 24 24'>
            <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
          </svg>
        </button>
      </form>
      {isLoggedIn ? (
        <img
        src={loggedInImage} 
        alt="Profile" 
        onClick={handleProfileClick(1)}
        />
      ) : null}
      {signInOpen ? (
        <div className="sign-in-form">
          <form onSubmit={handleSubmit}>
            <button id='close-sign-in' onClick={handleProfileClick(0)}>X</button>
            <input
              className='sign-in-input'
              type="text"
              placeholder="Username"
              name="uname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className='sign-in-input'
              type="password"
              placeholder="Password"
              name="psw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="sign-in-submit" type="submit">Sign In</button>
          </form>
        </div>
      ) : (
        <>
          <Link to="/Signup" id="sign-up-btn">Create an account</Link>
          <button className='sign-in-btn' onClick={handleProfileClick(0)}>Sign In</button>
        </>
      )}
    </nav>
  );

};

export default Navbar;
