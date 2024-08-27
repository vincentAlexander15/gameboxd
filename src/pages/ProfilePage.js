import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../components/useFetch';
import "../styles/ProfilePage.css";
import ProfileBanner from "../components/ProfileBanner";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useContext(AuthContext);
  
    
    
    return (
      <div className="main">
        <Navbar/>
        <div className="content-area">
          <SecondNavbar/>
          <ProfileBanner user={currentUser}/>
        </div>
        <Footer/>
      </div>
    );
  };

export default ProfilePage;