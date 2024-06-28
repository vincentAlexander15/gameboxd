import { React, useState } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import './HomePage.css';

const HomePage = () => {
  const [hovering, setHovering] = useState(false);
  const[adjective, setAdjective] = useState('test');

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

  const handleMouseLeave = () => {
    setHovering(false);
  }

  return (
    <div>
      <Navbar/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <GameCarousel/>
      </div>
      <div className='explore' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/DataPage" className='explore-link'>Find Something . . . {adjective}</Link>
      </div>
    </div>
  );
}

export default HomePage;
