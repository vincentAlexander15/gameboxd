import { React, useEffect, useContext } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import '../styles/HomePage.css';
import '../fonts/fonts.css';
import { AuthContext } from '../components/AuthContext';
import Footer from '../components/Footer';

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <Navbar/>
      <div className='carousel-container'>
        <GameCarousel/>
      </div>
      <div className='website-intro'>
        {isLoggedIn ? (
          <><h2 id="intro-text">Welcome back to the world of gaming with GameBoxd. Enjoy your journey.</h2><Link to="/DataPage" className='explore-link'>EXPLORE</Link></>
        ) : (
          <><h2 id="intro-text">Explore the world of gaming with GameBoxd. Connect, discover, and enjoy. Sign up to start your journey.</h2><Link to="/Signup" className='explore-link'>GET STARTED</Link></>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default HomePage;
