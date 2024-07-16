import React, { useState, useEffect } from 'react';

const useFetch = (url, method, body) => {
    const [data, setData] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isFound, setIsFound] = useState(false); 
    const [firstSearch, setFirstSearch] = useState(true);
  
    // Fetch access token
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
  
    // Fetch data
      useEffect(() => {
          if (accessToken && body) { // check if body is defined before fetching
          const requestOptions = {
              method: method,
              headers: {
              'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              },
              body: body
          };
          const fetchData = async () => {
              const response = await fetch(url, requestOptions);
              const result = await response.json();
              setData(result);
              if (result.length === 0) {
                  setIsFound(false)
              } else {
                  setIsFound(true)
              }
              setFirstSearch(false)
              }
              fetchData();
          }
      }, [accessToken, url, method, body]);
      return data;
  }
  


export default useFetch;