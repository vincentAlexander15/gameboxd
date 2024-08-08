import '../styles/ReviewPopup.css';
import { useState, useEffect, useContext } from 'react';
import '../styles/ReviewList.css';
import { AuthContext } from '../components/AuthContext';
import Pencil from "../images/PencilSVG";
import TrashCan from "../images/TrashCanSVG";
import ReviewPopup from '../components/ReviewPopup';

const ReviewList = ({ gameID }) => {
    const [data, setData] = useState([]);
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);

    useEffect(() => {
        const getReviews = async () => {
            const response = await fetch('http://localhost:5000/getReviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameID, currentUser }),
                credentials: 'include' // Include cookies in the request
            });
            const data = await response.json();
            setData(data);
            console.log(data);
        };
        getReviews();
    }, [gameID]);

    const toggleReviewPopup = () => {
        setIsReviewPopupOpen(!isReviewPopupOpen);
    };

    const handleDelete = () => {
        fetch('http://localhost:5000/deleteReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameID, currentUser }),
            credentials: 'include' // Include cookies in the request
        }).then(() => {
            window.location.reload();
        });
    };

    const AllReviews = () => {
        if (data.length !== 0){
            return (
                <div className="display-reviews">
                    {data && data.map((review, index) => (
                        review.review === "" ? null :
                        <div key={index} className="user-review">
                            <div className="review-header">
                                <div className="review-username">{review.username}</div>
                                <div className="review-rating">{review.rating}/5</div>
                                <div className="review-date">{review.date}</div>
                                {review.username === currentUser ? 
                                <div className="review-hover">
                                    <button className="review-pencil" onClick={toggleReviewPopup}><Pencil/></button>
                                    <button className="review-trashcan" onClick={handleDelete}><TrashCan/></button>
                                </div> 
                                : 
                                null}        
                            </div>
                            <div className="review-text">{review.review}</div>
                            <hr className="review-divider"></hr>
                        </div>
                    ))}
                    {isReviewPopupOpen && <ReviewPopup gameID={gameID} review_rating={data[0].rating} review_text={data[0].review} onClose={toggleReviewPopup} />}
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
