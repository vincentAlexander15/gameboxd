import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import './HomePage.css';

const HomePage = () => {
  const adjectives = [
    "Adventurous",
    "Thrilling",
    "Challenging",
    "Epic",
    "Mysterious",
    "Immersive",
    "Fun",
    "Exciting",
    "Intense",
    "Scary",
    "Intriguing",
    "Captivating",
    "Addictive",
    "Fast-paced",
    "Engaging",
    "Innovative",
    "Unforgettable",
    "Mesmerizing",
    "Heart-pounding",
    "Mind-blowing"
  ];
  
  return (
    <div>
      <Navbar/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <GameCarousel/>
      </div>
      <div className='explore'>
          <Link to="/DataPage" className='explore-link'>Find Something . . .</Link>
      </div>
    </div>
  );
}

export default HomePage;
