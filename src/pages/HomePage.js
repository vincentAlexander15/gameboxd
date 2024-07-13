import { React, useState } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import '../styles/HomePage.css';
import '../fonts/fonts.css';

const HomePage = () => {
  
  return (
    <div>
      <Navbar/>
      <div className='carousel-container'>
        <GameCarousel/>
      </div>
      <div className='website-intro'>
          <h2 id="intro-text">Explore the world of gaming with GameBoxd. Connect, discover, and enjoy. Sign up to start your journey.</h2>
        <Link to="/DataPage" className='explore-link'>GET STARTED</Link>
      </div>
    </div>
  );
}

export default HomePage;
