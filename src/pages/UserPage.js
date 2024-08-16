import { React, useEffect, useContext } from 'react';
import Navbar from "../components/Navbar";
import '../fonts/fonts.css';
import { AuthContext } from '../components/AuthContext';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const UserPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div className='main'>
      <Navbar/>
      <p color='white'>{ user }</p>
      <Footer/>
    </div>
  );
}

export default UserPage;
