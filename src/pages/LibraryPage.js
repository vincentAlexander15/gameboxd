import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext, useEffect } from 'react';
import useFetch from '../components/useFetch';
import "../styles/LibraryPage.css";
import FavButton from '../components/favButton';

const LibraryPage = () => {

    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [allUserGameIDS, setAllUserGameIDS] = useState('');

    const allUserGames = useFetch('/igdb/games', 'POST', `fields *, cover.*; where id = ${allUserGameIDS};`);

    const GameList = ({ allUserGames }) => {
        return (
            <div className="game-list">
                {allUserGames && allUserGames.map((item, index) => (
                    <div key={index} className="game-item">
                        <div>
                            {item && item.cover && item.cover.url ? (
                                <img className="cover" src={item.cover.url.replace('t_thumb', 't_1080p')} alt="cover" />
                            ) : (
                                <span style={{borderRadius: '25px', height: '337.33px', width: '253px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>No image available</span>
                            )}
                        </div>
                        <FavButton key={item.id} gameID={item.id} />
                    </div>
                ))}
            </div>
        );
    };

    useEffect(() => {
        if(isLoggedIn) {
            const FetchFavorites = async () => {
                const send = { currentUser };
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
                    if (data) {
                        const ids = data.map(item => item.toString());
                        setAllUserGameIDS("(" + ids.join(', ') + ")");
                    } else {
                        console.log("data might be empty", data);
                    }
                } else {
                    console.error('Failed to retrieve games');
                }
            };
            FetchFavorites();
        };
    }, [currentUser]);


    return (
        <div className="main">
            <Navbar/>
            <div className="library-content">
                <SecondNavbar/>
                {isLoggedIn ? 
                    <div className="allGames">
                        <GameList allUserGames={allUserGames} />
                    </div>
                :
                <p>Sign in to add Games</p>
                }

            </div>
            <Footer/>
        </div>
    );
    
}

export default LibraryPage;
