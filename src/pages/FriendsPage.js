import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../components/useFetch';
import FollowButton from '../components/followButton';
import "../styles/FriendsPage.css";

const FriendsPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [allUserGameIDS, setAllUserGameIDS] = useState([]);
    const [ friendsSize, setFriendsSize] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/getUserFollowing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUser }),
            });
            const data = await response.json();
            setFriendsSize(data.length);
            setAllUserGameIDS(data);
        };
        fetchData();
    }, [currentUser]);

    const handleClick = (user) => {
        navigate('/UserPage', {state: {user: user}})
    };

    return (
        <div className="main">
            <Navbar/>
            <div className="content-area">
                <SecondNavbar/>
                {friendsSize === 0 ? <h1 style={{color:"white"}}>Looks like you don't have any friends yet! Add some friends to see their favorite games!</h1> 
                : 
                <div className="friend-list">
                    {allUserGameIDS && allUserGameIDS.map((user) => (
                    <div className="friend-item" key={user}>
                        <div  style={{height:"50px"}} className="user-item">
                            <div className="user-pfp">
                                <img
                                    src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z'/%3E%3C/svg%3E"
                                    alt="Profile" 
                                    className="users-profile-icon"
                                    onClick={() => handleClick(user)}
                                />
                            </div>
                            <div className="user-info">
                                <div>{user}</div>
                                <FollowButton username={user}/>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                }
            </div>
            <Footer/>
        </div>
    );
    
}

export default FriendsPage;
