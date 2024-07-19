// components/Navbar.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import '../fonts/fonts.css';
import { AuthContext } from './AuthContext';
import SearchSuggestions from '../components/SearchSuggestions';

const Navbar = () => {
  const [inputValue, setInputValue] = useState(''); 
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password
    };
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        setIsLoggedIn(true);
        setError(false);
        navigate('/');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setProfileOpen(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
      const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            setProfileOpen(false);
          }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  const handleSignUp = () => {
    navigate('/SignUp');
  };

  const handleSubmit = (event) => {
    if (inputValue !== null && inputValue !== '') {
      event.preventDefault();
      navigate('/DataPage', {state : { searchQuery: inputValue}});
    }
  };

  const handleSignInClick = () => {
    setSignInOpen(!signInOpen);
    setError(false);
    setUsername('');
    setPassword('');
  };

  const handleProfileClick = () => () => {
    setProfileOpen(!profileOpen);
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

  const handleClick = (buttonName) => {
    navigate(`/${buttonName}`, {state : { currentButton: buttonName}});
  };

  return (
    <nav className="navbar">
      <Link className='title' to="/">Gameboxd</Link>
      <div className="elements" style={{display:"flex", marginLeft:"auto"}}>
        <div className='search-menu'>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              id='search-input'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <SearchSuggestions className={'navbar'} inputValue={inputValue} setInputValue={setInputValue} />
            <button id="search-icon" type="submit">
              <svg style={{ width: '24px', height: '24px'}} viewBox= '0 0 24 24'>
                <path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
            </button>
          </form>
        </div>
        {isLoggedIn ? (
          <div className='profile-container'>
            <div className='profile-container'>
              <img
                src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'/%3E%3C/svg%3E"
                alt="Profile" 
                className="profile-icon"
                onClick={handleProfileClick()}
              />
            </div>
            {profileOpen && (
              <div className="profile-menu" ref={profileRef}>
                <button className="profile-link" onClick={() => handleClick("Profile")}>Profile</button>
                <button className="profile-link" onClick={() => handleClick("Library")}>Library</button>
                <button className="profile-link" onClick={() => handleClick("Settings")}>Settings</button>
                <button className="profile-link" onClick={handleSignOutClick}>Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {signInOpen ? (
              <div className="sign-in-form">
                <form onSubmit={handleSignIn}>
                  <button id='close-sign-in' onClick={handleSignInClick}>X</button>
                  <input
                    className={error ? 'sign-in-error' : 'sign-in-input'} 
                    type="text"
                    placeholder="Username"
                    name="uname"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setError(false)}
                    required
                  />
                  <input
                    className={error ? 'sign-in-error' : 'sign-in-input'} 
                    type="password"
                    placeholder="Password"
                    name="psw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setError(false)}
                    required
                  />
                  <button className="sign-in-submit" type="submit">Sign In</button>
                </form>
              </div>
            ) : (
              <>
                <button className='sign-in-btn' onClick={handleSignUp}>Create an account</button>
                <button className='sign-in-btn' onClick={handleSignInClick}>Sign In</button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
