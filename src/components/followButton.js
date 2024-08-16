import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useState, useContext, useEffect } from 'react';
import "../styles/FavButton.css";
import PlusSign from '../images/PlusSVG';
import CheckMark from '../images/CheckSVG';

const FollowButton = ({username}) => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [buttonText, setButtonText] = useState("FOLLOW");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch('http://localhost:5000/inUserFollowers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ currentUser, followedUser: username}),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.isFollowing && isLoggedIn) {
                    setButtonText("UNFOLLOW");
                } 
            } else {
                console.error('Failed to retrieve followers');
            }
        };
        fetchFavorites();
    }, [currentUser, username]);

    const handleClick = () => {
        if (isLoggedIn) {
            if (buttonText === "FOLLOW") {
                fetch('http://localhost:5000/followUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ currentUser, followedUser: username}),
                });
                setButtonText("UNFOLLOW");
            } else {
                fetch('http://localhost:5000/unfollowUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ currentUser, unfollowedUser: username}),
                });
                setButtonText("FOLLOW");
            }
        } else {
            navigate('/SignUp');
        }
    };

    return (
        <button className={`button-${buttonText}`} onClick={() => handleClick()}>
            {buttonText === "FOLLOW" ? "FOLLOW" : "UNFOLLOW"}
        </button>
    );
};

export default FollowButton;
