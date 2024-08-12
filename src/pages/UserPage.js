import { React, useEffect, useContext } from 'react';
import Navbar from "../components/Navbar";
import '../fonts/fonts.css';
import { AuthContext } from '../components/AuthContext';
import Footer from '../components/Footer';

const UserPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <div className='main'>
      <Navbar/>
            
      <Footer/>
    </div>
  );
}

export default UserPage;
