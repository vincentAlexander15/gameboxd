import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useState, useContext, useEffect } from 'react';
import "../styles/FavButton.css";
import PlusSign from '../images/PlusSVG';
import CheckMark from '../images/CheckSVG';

const FavButton = ({gameID}) => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [buttonText, setButtonText] = useState("ADD");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await fetch('http://localhost:5000/inUserFavorites?gameID=' + gameID + '&currentUser=' + currentUser, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                if (data.isFavorite && isLoggedIn) {
                    setButtonText("REMOVE");
                } 
            } else {
                console.error('Failed to retrieve games');
            }
        };
        fetchFavorites();
    }, [currentUser, gameID]);

    const handleClick = () => {
        if (isLoggedIn) {
            if (buttonText === "ADD") {
                fetch('http://localhost:5000/addFavorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ currentUser, gameID}),
                });
                setButtonText("REMOVE");
            } else {
                fetch('http://localhost:5000/removeFavorite?gameID=' + gameID + '&currentUser=' + currentUser, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                setButtonText("ADD");
            }
        } else {
            navigate('/SignUp');
        }
    };

    return (
        <button className={`button-${buttonText}`} onClick={() => handleClick()}>
            {buttonText === "ADD" ? <PlusSign /> : <CheckMark />}
        </button>
    );
};

export default FavButton;
