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
        if (data !== null){
            return (
                <div className="display-reviews">
                    {data && data.map((review, index) => (
                        <div key={index} className="user-review">
                            <h3>{review.username}</h3>
                            <p>{review.review}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <p>No Reviews Yet</p>
            );
        }
    };
    return (
        <AllReviews/>
    );
};

export default ReviewList;
