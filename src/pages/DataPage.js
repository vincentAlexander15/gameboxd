import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/DataPage.css'

const DataPage = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [data, setData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { searchQuery } = location.state || {};
    const [inputValue, setInputValue] = useState('');
    const [isFound, setIsFound] = useState(false); 
    const [firstSearch, setFirstSearch] = useState(true);

    const handleSubmit = (event) => {
      if (inputValue !== null && inputValue !== '') {
        event.preventDefault();
        navigate('/DataPage', {state : { searchQuery: inputValue}});
      }
    };

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    // Function to get the access token
    useEffect(() => {
      const id = process.env.REACT_APP_TWITCH_CLIENT_ID;
      const secret = process.env.REACT_APP_TWITCH_CLIENT_SECRET;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch(`https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`, requestOptions)
          .then(response => response.json())
          .then(data => setAccessToken(data.access_token));
    }, []);
  
    // Function to fetch data from API
    useEffect(() => {
      if (accessToken && searchQuery) {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: `fields *, cover.*; search "${searchQuery}"; limit 10;`,
          };
          const fetchData = async () => {
            const response = await fetch('/igdb/games', requestOptions);
            const result = await response.json()
            console.log('API Result: ', result);
            setData(result)
            if (result.length === 0) {
              setIsFound(false)
            } else {
              setIsFound(true)
            }
            setFirstSearch(false)
          }
          fetchData(accessToken)
      }
    }, [accessToken, searchQuery]);

    const handleClick = (item) => {
      navigate('/GamePage', {state : { gameData : item}});
    }
  
    return (
      <div className="text-center">
        <div>
          <Navbar/>
        </div>
        <form onSubmit={handleSubmit} className="main-search-form">
          <input
            id='main-search-input'
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </form>
        { firstSearch ? (
          // Placeholder gif:
          <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading..." />
        ) : (
          isFound ? (
            <div>
              {data && (
                <table>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="cover">
                          {item["cover"] && item["cover"].url ? (
                            <img className="game-covers" src={item["cover"].url.replace('t_thumb', 't_1080p')} alt={item.name} />
                          ) : (
                            <span>No image available</span>
                          )}
                        </td>
                        <td className="description">
                          <div style={{ display: 'block', textAlign: 'left'}} onClick={() => handleClick(item)}>
                            <h1 className="game-title">{item.name}</h1>
                          </div>
                          <p style={{color: 'white'}}>{item.summary}</p>
                        </td>
                        <td><a href={item.url} target="_blank" rel="noopener noreferrer">Link</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <h1>No Results Found</h1>
          )
        )}
      </div>
    );
  }
  
  export default DataPage;