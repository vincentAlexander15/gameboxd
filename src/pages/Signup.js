import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import '../styles/Signup.css';
import Footer from '../components/Footer';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notif, setNotif] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User signed up successfully');
        setNotif(data.message);
        setError(false);
      } else {
        setNotif(data.message);
        setError(true);
      }
    } catch (error) {
      setNotif('Error: ' + error.message);
      setError(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sign-up-container">
        <div className="prompt">Create Account</div>
        <form onSubmit={handleSubmit}>
          <input
            className="user"
            type="text"
            placeholder="Username"
            name="uname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="pwd"
            type="password"
            placeholder="Password"
            name="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="buttonDiv">
            <button className="signupSubmit" type="submit">Sign Up</button>
          </div>
        </form>
        {error ? notif && <div className="error">{notif}</div> : notif && <div className="notif">{notif}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
