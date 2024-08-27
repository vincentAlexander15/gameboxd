import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import { AuthContext } from '../components/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../components/useFetch';
import "../styles/LibraryPage.css";
import FavButton from '../components/favButton';

const LibraryPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, currentUser } = useContext(AuthContext);
    const [allUserGameIDS, setAllUserGameIDS] = useState('0');
    const [librarySize, setLibrarySize] = useState(0);

    const allUserGames = useFetch('/igdb/games', 'POST', `fields *, cover.*; where id = ${allUserGameIDS}; limit ${librarySize.toString()};`);

    const handleClick = (item) => {
        navigate('/GamePage', {state : { gameData : item}});
    };

    const GameList = ({ allUserGames }) => {
        if (allUserGameIDS !== '0'){
            return (
                <div className="game-list">
                    {allUserGames && allUserGames.map((item, index) => (
                        <div key={index} className="game-item">
                            <span className="library-game-title" title={item.name}>{item.name}</span>
                            <div>
                                {item && item.cover && item.cover.url ? (
                                    <img className="library-cover" src={item.cover.url.replace('t_thumb', 't_1080p')} alt="cover" onClick={() => handleClick(item)} />
                                ) : (
                                    <span style={{borderRadius: '25px', height: '337.33px', width: '253px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>No image available</span>
                                )}
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <FavButton key={item.id} gameID={item.id} />
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <>
                    <div style={{ marginTop: '30px',color: 'white' }}>Add some Games</div>
                    <Link to="/DataPage" className='explore-link'>EXPLORE</Link>
                </>
            );
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const FetchFavorites = async () => {
                const response = await fetch('http://localhost:5000/getUserFavorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ currentUser })
                });
                const data = await response.json();
                if (data.length === 0) {
                    setAllUserGameIDS('0');
                } else {
                    setAllUserGameIDS('(' + data.join(', ') + ')');
                }
                setLibrarySize(data.length);
            }
            FetchFavorites();
        };
    }, [currentUser]);


    return (
        <div className="main">
            <Navbar/>
            <div className="content-area">
                <SecondNavbar/>
                <div className="allGames">
                    <GameList allUserGames={allUserGames} />
                </div>
            </div>
            <Footer/>
        </div>
    );
    
}

export default LibraryPage;
