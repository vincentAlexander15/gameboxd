import { React, useState } from 'react';
import Navbar from "../components/Navbar";
import '../styles/Signup.css';

const Signup = () => {


  return (
    <div>
        <Navbar/>
        <div class="sign-up-container">
          <div className="prompt">Create Account</div>
          <input className="user" type="text" placeholder="Username" name="uname" required/>
          <input className="pwd" type="password" placeholder="Password" name="psw" required/>           
          <button className="signupSubmit" type="submit">Sign Up</button>
        </div>
    </div>
  );
}

export default Signup;