import { AuthContext } from './AuthContext';
import { useState, useContext, useEffect } from 'react';

const FavButton = ({gameID}) => {
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [buttonText, setButtonText] = useState("ADD");

    useEffect(() => {
        const fetchFavorites = async () => {
            const send = { currentUser, gameID };
            const response = await fetch('http://localhost:5000/getUserFavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(send)
            });
            if (response.ok) {
                const data = await response.json();
                if (data.isFavorite) {
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
                fetch('http://localhost:5000/removeFavorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ currentUser, gameID}),
                });
                setButtonText("ADD");
            }
        } else {
            alert('Please log in to add games to your favorites');
        }
    };

    return (
        <button onClick={() => handleClick()}>{buttonText}</button>
    );
};

export default FavButton;
