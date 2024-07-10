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
        <h2 style={{font: '1.4em silkscreen1', marginLeft: 'auto', marginRight: 'auto'}}>A new way to keep track of all your favorite games in one place. This is some extra text for the 
          same of the box. This is extra text for the sake of the box.
        </h2>
      </div>
      <div className='explore'>
        <Link to="/DataPage" className='explore-link'>GET STARTED</Link>
      </div>
    </div>
  );
}

export default HomePage;
