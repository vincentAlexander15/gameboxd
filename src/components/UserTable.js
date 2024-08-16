import React, { useState, useEffect, useContext } from 'react';
import '../styles/DataPage.css'
import { AuthContext } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import FavButton from './favButton';
import "../styles/UserTable.css";
import "./followButton";
import FollowButton from './followButton';

const UserTable = ({currentPage, data}) => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const usersPerPage = 15;

    //TODO navigate to user page on click
    const handleClick = (item) => {
        navigate('/UserPage', {state: {user: item.username}})
    };

    // Calculate the index of the first and last game on the current page
    const indexOfLastUser = Math.min(currentPage * usersPerPage, data.length);
    const indexOfFirstUser = (currentPage * usersPerPage) - usersPerPage;

    // Get the games for the current page
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
    console.log(currentUsers);

    return (
        <div>
            <div className="user-list">
                {currentUsers && currentUsers.map((item, index) => (
                    <div key={index} className="user-item">
                        <div className="user-pfp">
                            <img
                                src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'/%3E%3C/svg%3E"
                                alt="Profile" 
                                className="users-profile-icon"
                                onClick={() => handleClick(item)}
                            />
                        </div>
                        <div className="user-info">
                            <div>{item.username}</div>
                            {currentUser === item.username ? null : <FollowButton username={item.username}/>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
