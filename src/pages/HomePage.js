import React from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Link to="/DataPage">Explore</Link>
    </div>
  );
}

export default HomePage;
