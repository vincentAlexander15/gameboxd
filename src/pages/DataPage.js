import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";


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
      setInputValue(event.target.value); // update inputValue when the input field changes
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
            body: `fields *; search "${searchQuery}"; limit 10;`,
          };
          const fetchData = async () => {
            const response = await fetch('/igdb/games', requestOptions);
            const result = await response.json()
            console.log('API Result: ', result);
            setData(result)
            // check if result json is empty:
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
  
    return (
      <div className="text-center">
        <div>
          <Navbar/>
        </div>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a game..."
          />
          <button type="submit">Search</button>
        </form>
        { firstSearch ? (
          <h1>Search for a Game...</h1>
        ) : (
          isFound ? (
            <div>
              {data && (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Summary</th>
                      <th>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.summary}</td>
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