import { React, useEffect, useContext, useState } from 'react';
import Navbar from "../components/Navbar";
import '../fonts/fonts.css';
import { AuthContext } from '../components/AuthContext';
import Footer from '../components/Footer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import FavButton from '../components/favButton';
import useFetch from '../components/useFetch';

const UserPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [allUserGameIDS, setAllUserGameIDS] = useState('0');
  const [librarySize, setLibrarySize] = useState(0);
  const { user } = location.state || {};

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
                <h2 style={{color:"white"}}>Looks like this user's library is empty</h2>
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
                    body: JSON.stringify({ currentUser: user })
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
    }, [user]);

  return (
    <div className='main'>
      <Navbar/>
        <div className="content-area">
          <div>{user}</div>
          <div className="allGames">
              <GameList allUserGames={allUserGames} />
          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default UserPage;
