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

    //TODO: grab all people current user is following, if there are people display each pfp, name and follow button
    // else display something that says "add some friends or something"
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

    return (
        <div className="main">
            <Navbar/>
            <div className="content-area">
                <SecondNavbar/>
                {friendsSize === 0 ? <h1>Looks like you don't have any friends yet! Add some friends to see their favorite games!</h1> : allUserGameIDS.map((user) => (
                    <div className="friend" key={user}>
                        <h1>{user}</h1>
                        <FollowButton username={user}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
    
}

export default FriendsPage;
