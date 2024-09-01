import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ProfileBanner.css";


// User is a string that represents the user's name. It will also be used to fetch the user's profile picture in the backend.
const ProfileBanner = ({user}) => {
    const navigate = useNavigate();
    const [favoritesLen, setFavoritesLen] = useState('0');
    const [followingLen, setFollowingLen] = useState('0');
    const [followersLen, setFollowersLen] = useState('0');
    // Fetch the user's profile picture from the backend
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/getProfileStats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUser: user }),
            });
            const data = await response.json();
            setFavoritesLen(data.totFav.length);
            setFollowersLen(data.totFollowers.length);
            setFollowingLen(data.totFollowing.length);
        };
        fetchData();
    }, [user]);

    return (
        <div className="profile-card">
            <div className="profile-pfp">
                <img
                    src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'/%3E%3C/svg%3E"
                    alt="Profile" 
                    className="users-profile-icon"
                />
            </div>
            <div className="profile-info">
                <div>{user}</div>
            </div>
            <span className="profile-links">
                <div className="profile-stat">
                    <button className="profPage-link" onClick={() => navigate('/Library')}>/Total Games</button>
                    <div className="len">{favoritesLen}</div>
                </div>
                <div className="profile-stat">
                    <button className="profPage-link" onClick={() => navigate('/Friends')}>/Following</button>
                    <div className="len">{followingLen}</div>
                </div>
                <div className="profile-stat">
                    <button className="profPage-link">/Followers</button>
                    <div className="len">{followersLen}</div>
                </div>      
            </span>
        </div>
    );
};

export default ProfileBanner;
