import { useState, useContext, useEffect } from 'react';
import '../styles/ReviewPopup.css';
import { AuthContext } from '../components/AuthContext';

const ReviewPopup = ({ onClose, gameID, review_rating, review_text }) => {
    const [rating, setRating] = useState(review_rating);
    const [review, setReview] = useState(review_text);
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date().toLocaleDateString();
        const response = await fetch('http://localhost:5000/insertReview', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({gameID: gameID.toString(), currentUser, review, rating, currentDate}),
            credentials: 'include' // Include cookies in the request
        });
        onClose();
        if (response.ok) {
            alert('Review submitted successfully!');
        } else {
            alert('Failed to submit review.');
        }
        window.location.reload();
    };

    return (
        <div className="review-popup">
            <form onSubmit={handleSubmit}>
                <h2>Write a Review</h2>
                <label className="rating">Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        min="0"
                        max="5"
                        step="0.5"
                    />
                <label className="review-text">Review:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        style={{resize: "none", height: "100%"}}
                    />
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default ReviewPopup;
