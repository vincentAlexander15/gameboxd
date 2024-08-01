import '../styles/ReviewPopup.css';
import { useState, useEffect } from 'react';
import '../styles/ReviewList.css';

const ReviewList = ({ gameID }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            const response = await fetch('http://localhost:5000/getReviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameID }),
                credentials: 'include' // Include cookies in the request
            });
            const data = await response.json();
            setData(data);
            console.log(data);
        };
        getReviews();
    }, [gameID]);

    const AllReviews = () => {
        if (data.length !== 0){
            return (
                <div className="display-reviews">
                    {data && data.map((review, index) => (
                        <div key={index} className="user-review">
                            <div className="review-header">
                                <div className="review-username">{review.username}</div>
                                <div className="review-rating">{review.rating}/5</div>
                            </div>
                            <div className="review-text">{review.review}</div>
                            <hr className="review-divider"></hr>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="no-reviews">No reviews yet</div>
            );
        }
    };
    return (
        <AllReviews/>
    );
};

export default ReviewList;
