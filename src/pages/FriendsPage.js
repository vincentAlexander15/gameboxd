import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../components/useFetch';
import FavButton from '../components/favButton';

const FriendsPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [allUserGameIDS, setAllUserGameIDS] = useState('');
    const [ friendsSize, setFriendsSize] = useState(0);

    //TODO: grab all people current user is following, if there are people display each pfp, name and follow button
    // else display something that says "add some friends or something"
    useEffect(()=> {
        
    }, [currentUser]);

    return (
        <div className="main">
            <Navbar/>
            <div className="content-area">
                <SecondNavbar/>
 
            </div>
            <Footer/>
        </div>
    );
    
}

export default FriendsPage;
