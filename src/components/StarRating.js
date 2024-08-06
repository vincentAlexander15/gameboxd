import React from 'react';
import '../styles/StarRating.css';

const StarRating = ({ score, gameID, userID, onScoreUpdate }) => {
    const maxStars = 5;
    const filledStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5;
    const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);

    const handleClick = async (newScore) => {
        const response = await fetch('http://localhost:5000/updateUserScore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameID, userID, newScore }),
        });
        const data = await response.json();
        if (data.success) {
            onScoreUpdate(newScore);
        }
    };

    return (
        <div className="star-rating">
            {[...Array(filledStars)].map((_, index) => (
                <span key={index} className="star filled" onClick={() => handleClick(index + 1)}>★</span>
            ))}
            {halfStar && <span className="star half" onClick={() => handleClick(filledStars + 0.5)}>★</span>}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={index} className="star empty" onClick={() => handleClick(filledStars + (halfStar ? 1 : 0) + index + 1)}>★</span>
            ))}
        </div>
    );
};

export default StarRating;
