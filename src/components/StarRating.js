import React, { useEffect } from 'react';
import '../styles/StarRating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ score, gameID, userID, onScoreUpdate }) => {
    const maxStars = 10; // 10 half stars
    const filledStars = Math.round(score * 2); // Convert score to half stars
    const emptyStars = maxStars - filledStars;

    useEffect(() => {
        const ratingStars = document.querySelectorAll('.rating_stars span.r');

        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const value = parseFloat(this.dataset.value);
                updateStars(value);
            });

            star.addEventListener('mouseout', function() {
                const ratingElement = document.getElementById('rating');
                const ratingValElement = document.getElementById('rating_val');
                if (ratingElement && ratingValElement) {
                    const rating = parseFloat(ratingElement.value);
                    updateStars(rating);
                }
            });

            star.addEventListener('click', function() {
                const value = parseFloat(this.dataset.value);
                const ratingElement = document.getElementById('rating');
                const ratingValElement = document.getElementById('rating_val');
                if (ratingElement && ratingValElement) {
                    ratingValElement.value = value;
                    const rating = parseFloat(this.dataset.rating);
                    ratingElement.value = rating;
                    updateStars(value);
                }
            });
        });

        updateStars(filledStars / 2);
    }, [filledStars]);

    const updateStars = (rating) => {
        const stars = document.querySelectorAll('.rating_stars span.s');
        stars.forEach(star => {
            const low = parseFloat(star.dataset.low);
            const high = parseFloat(star.dataset.high);
            star.classList.remove('active-high', 'active-low', 'inactive');
            if (rating >= high) {
                star.classList.add('active-high');
            } else if (rating >= low) {
                star.classList.add('active-low');
            } else {
                star.classList.add('inactive');
            }
        });
    };

    const handleClick = async (newScore) => {
        const currentDate = new Date().toLocaleDateString();
        const response = await fetch('http://localhost:5000/updateUserScore?gameID=' + gameID + '&userID=' + userID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newScore, currentDate }),
        });
        const data = await response.json();
        if (data.success) {
            onScoreUpdate(newScore);
        }
        window.location.reload();
    };

    const star = <FontAwesomeIcon className="fa starFilled" icon={faStar} />;
    const halfStar = <FontAwesomeIcon className="fa halfStar" icon={faStarHalf} />;
    const empty = <FontAwesomeIcon className="fa starEmpty" icon={faStar} />;

    return (
        <div className="star-rating">
            <input type='hidden' id="rating" value={score} />
            <input type='hidden' id="rating_val" value={filledStars / 2} />
            <span className="rating_stars rating_0">
                <span style={{ position : 'absolute', zIndex : '-1', overflow : 'hidden' }}>
                    {empty}{empty}{empty}{empty}{empty}
                </span>
                <span className='s' data-low='0.5' data-high='1'>{empty}{halfStar}{star}</span>
                <span className='s' data-low='1.5' data-high='2'>{empty}{halfStar}{star}</span>
                <span className='s' data-low='2.5' data-high='3'>{empty}{halfStar}{star}</span>
                <span className='s' data-low='3.5' data-high='4'>{empty}{halfStar}{star}</span>
                <span className='s' data-low='4.5' data-high='5'>{empty}{halfStar}{star}</span>
                                        
                <span className='r r0_5' data-rating='1' data-value='0.5' onClick={() => handleClick(0.5)}></span>
                <span className='r r1' data-rating='1' data-value='1' onClick={() => handleClick(1)}></span>
                <span className='r r1_5' data-rating='15' data-value='1.5' onClick={() => handleClick(1.5)}></span>
                <span className='r r2' data-rating='2' data-value='2' onClick={() => handleClick(2)}></span>
                <span className='r r2_5' data-rating='25' data-value='2.5' onClick={() => handleClick(2.5)}></span>
                <span className='r r3' data-rating='3' data-value='3' onClick={() => handleClick(3)}></span>
                <span className='r r3_5' data-rating='35' data-value='3.5' onClick={() => handleClick(3.5)}></span>
                <span className='r r4' data-rating='4' data-value='4' onClick={() => handleClick(4)}></span>
                <span className='r r4_5' data-rating='45' data-value='4.5' onClick={() => handleClick(4.5)}></span>
                <span className='r r5' data-rating='5' data-value='5' onClick={() => handleClick(5)}></span>
            </span>
        </div>
    );
};

export default StarRating;
