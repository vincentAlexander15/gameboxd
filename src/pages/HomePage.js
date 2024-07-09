import { React, useState } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import '../styles/HomePage.css';
import '../fonts/fonts.css';

const HomePage = () => {
  const[adjective, setAdjective] = useState('. . .');

  const updateWord = () => {
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
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    setAdjective(randomAdjective)
  }
  
  const handleMouseEnter = () => {
    updateWord();
  }

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
      <div className='explore' onMouseEnter={handleMouseEnter}>
        <Link to="/DataPage" className='explore-link'>Find Something {adjective}</Link>
      </div>
    </div>
  );
}

export default HomePage;
