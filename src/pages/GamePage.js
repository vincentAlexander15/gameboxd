import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import useFetch from '../components/useFetch';
import '../styles/GamePage.css';
import '../fonts/fonts.css';
import noImg from '../images/noImg.jpg'
import FavButton from '../components/favButton';
import ScreenshotCarousel from '../components/ScreenShotCarousel';
import Footer from '../components/Footer';
import ReviewPopup from '../components/ReviewPopup';
import { AuthContext } from '../components/AuthContext';
import ReviewList from '../components/ReviewList';

const GamePage = () => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    //Retrieve data from DataPage
    const location = useLocation();
    const navigate = useNavigate();
    const { gameData } = location.state || {};
    
    //Make API calls using useFetch
    const url = '/igdb/release_dates';
    const method = 'POST';
    const scs = useFetch('/igdb/screenshots', method, `fields *; where game = ${gameData.id}; limit 10;`);
    const releaseDates = useFetch(url, method, `fields game, date, human; where game = ${gameData.id}; sort date asc; limit 1;`);
    const cover = useFetch('/igdb/games', method, `fields cover.*; where id = ${gameData.id};`);

    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

    const toggleSummary = () => {
        setIsSummaryExpanded(!isSummaryExpanded);
    };

    const toggleReviewPopup = () => {
        setIsReviewPopupOpen(!isReviewPopupOpen);
    };

    const getSummary = (summary) => {
        const maxLength = 300; // Change this to the length you want
        if (summary.length > maxLength) {
            if (isSummaryExpanded) {
                return summary;
            } else {
                return `${summary.substring(0, maxLength)}...`; // Change 100 to the length you want
            }
        } else {
            return summary;
        }
    };

    return (
        <div className='main'>
            <Navbar/>
            {scs ? <ScreenshotCarousel scs={scs} /> : <div>Loading screenshots...</div>}
            <div className="content">
                <div className="visual">
                    {cover && cover[0] && cover[0].cover && cover[0].cover.url ? (
                        <img className="cover" src={cover[0].cover.url.replace('t_thumb', 't_1080p')} alt="cover"/>
                        ) : (
                        <img className="cover" src={noImg} alt="cover"/>
                    )}
                    {/* <div className="user-rating">
                        Rating goes here
                    </div> */}
                </div>

                <div className="info">
                    <h1 className='gametitle'>{gameData ? gameData.name : "Loading..."}</h1>
                    <h2 className='release-date'>
                        {releaseDates && releaseDates[0] && releaseDates[0].date ? (
                            <span>{releaseDates[0].human}</span>
                        ) : (
                            <span>Release date not available</span>
                        )}
                    </h2>
                    <p className='summary'>
                        {gameData ? getSummary(gameData.summary) : "Loading..."}
                    </p>
                    {gameData && gameData.summary && gameData.summary.length > 50 && (
                        <button className="read-more" onClick={toggleSummary}>
                            {isSummaryExpanded ? "Read Less" : "Read More"}
                        </button>
                    )}
                    <ReviewList gameID={gameData.id} />
                </div>

                <div className="details">
                    <div className='details-menu'>
                        <p>SCORE</p>
                        {isLoggedIn ? 
                        <>    
                            <button className="review-button" onClick={toggleReviewPopup}>Write a Review</button>
                            <p>STARS GO HERE</p>
                        </>
                        :
                        <p><button onClick={() => navigate('/Signup')}>Sign in</button> to write a review</p>
                        }
                        <FavButton key={gameData.id} gameID={gameData.id} />
                    </div>
                </div>
            </div>
            {isReviewPopupOpen && <ReviewPopup gameID={gameData.id} onClose={toggleReviewPopup} />}
            <Footer/>
        </div>
    );
}

export default GamePage;
