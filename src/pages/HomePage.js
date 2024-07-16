import { React, useEffect, useContext } from 'react';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import '../styles/HomePage.css';
import '../fonts/fonts.css';
import { AuthContext } from '../components/AuthContext';

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const response = await fetch('http://localhost:5000/checkLoggedIn', {
  //       credentials: 'include',
  //     });
  //     setIsLoggedIn(response.ok);
  //   };
  //   checkLoggedIn();
  // }, []);

  return (
    <div>
      <Navbar/>
      <div className='carousel-container'>
        <GameCarousel/>
      </div>
      <div className='website-intro'>
        {isLoggedIn ? (
          <h2 id="intro-text">Welcome back to the world of gaming with GameBoxd. Enjoy your journey.</h2>
        ) : (
          <h2 id="intro-text">Explore the world of gaming with GameBoxd. Connect, discover, and enjoy. Sign up to start your journey.</h2>
        )}
        <Link to="/DataPage" className='explore-link'>GET STARTED</Link>
      </div>
    </div>
  );
}

export default HomePage;
