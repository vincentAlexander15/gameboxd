import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import useFetch from '../components/useFetch';
import '../styles/GamePage.css';
import '../fonts/fonts.css';
import noImg from '../images/noImg.jpg';
import FavButton from '../components/favButton';
import ScreenshotCarousel from '../components/ScreenShotCarousel';
import Footer from '../components/Footer';
import ReviewPopup from '../components/ReviewPopup';
import { AuthContext } from '../components/AuthContext';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';

const GamePage = () => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameData } = location.state || {};

    const url = '/igdb/release_dates';
    const method = 'POST';
    const scs = useFetch('/igdb/screenshots', method, `fields *; where game = ${gameData.id}; limit 10;`);
    const releaseDates = useFetch(url, method, `fields game, date, human; where game = ${gameData.id}; sort date asc; limit 1;`);
    const cover = useFetch('/igdb/games', method, `fields cover.*; where id = ${gameData.id};`);

    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [score, setScore] = useState(null);
    const [userScore, setUserScore] = useState(null);

    const toggleSummary = () => {
        setIsSummaryExpanded(!isSummaryExpanded);
    };

    const toggleReviewPopup = () => {
        setIsReviewPopupOpen(!isReviewPopupOpen);
    };

    const toggleSharePopup = () => {
        // alert that game page is copied to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Game page URL copied to clipboard!');
    };

    const getSummary = (summary) => {
        const maxLength = 300;
        if (summary.length > maxLength) {
            return isSummaryExpanded ? summary : `${summary.substring(0, maxLength)}...`;
        } else {
            return summary;
        }
    };

    const getUserScore = async () => {
        const response = await fetch('http://localhost:5000/getUserScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: gameData.id, userID: currentUser }),
        });
        const data = await response.json();
        setUserScore(data);
    }

    const getScore = async () => {
        const response = await fetch('http://localhost:5000/getScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID: gameData.id }),
        });
        const data = await response.json();
        setScore(data);
    };

    useEffect(() => {
        if (gameData) {
            getScore();
            if (isLoggedIn) {
                getUserScore();
            }
        }
    }, [gameData]);

    const handleUserScoreUpdate = (newUserScore) => {
        setUserScore(newUserScore);
    };

    return (
        <div className='main'>
            <Navbar />
            {scs ? <ScreenshotCarousel scs={scs} /> : <div>Loading screenshots...</div>}
            <div className="content">
                <div className="visual">
                    {cover && cover[0] && cover[0].cover && cover[0].cover.url ? (
                        <img className="cover" src={cover[0].cover.url.replace('t_thumb', 't_1080p')} alt="cover" />
                    ) : (
                        <img className="cover" src={noImg} alt="cover" />
                    )}
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
                </div>

                <div className="details">
                    <div className='details-menu'>
                        {/* round score to 2 decimals */}
                        <h2 className='average-score'>{score ? score.toFixed(1) : 0} / 5</h2>
                        {isLoggedIn ? 
                        <>
                            {userScore !== null ? <StarRating score={userScore} gameID={gameData.id} userID={currentUser} onScoreUpdate={handleUserScoreUpdate} /> : "Loading..."}
                            <button className="review-button" onClick={toggleReviewPopup}>Review</button>
                            <button className="share-button" onClick={toggleSharePopup}>Share</button>
                        </>
                        :
                        <p><button onClick={() => navigate('/Signup')}>Sign in</button> to write a review</p>
                        }
                        <FavButton key={gameData.id} gameID={gameData.id} />
                    </div>
                </div>
            </div>
            {isReviewPopupOpen && <ReviewPopup gameID={gameData.id} onClose={toggleReviewPopup} />}
            <div className='game-reviews'>
                <h2 className="review-title">Reviews</h2>
                <ReviewList gameID={gameData.id} />
            </div>
            <Footer />
        </div>
    );
}

export default GamePage;
