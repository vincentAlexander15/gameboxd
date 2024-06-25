import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '54vh' }}>
        <GameCarousel/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link to="/DataPage">Explore</Link>
      </div>
    </div>
  );
}

export default HomePage;
