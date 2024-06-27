import './GameCarousel.css';
import React, { useState, useEffect } from 'react';

const GameCarousel = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);

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
    if (accessToken) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: "fields name, cover.*; where rating_count > 2500 ; sort rating desc; limit 10;"
        };
        const fetchData = async () => {
          const response = await fetch('/igdb/games', requestOptions);
          const result = await response.json()
          console.log('API Result: ', result);
          setData(result)
        }
        fetchData(accessToken)
    }
  }, [accessToken]);

    return (
      <div>
        {data && (
          <div class="slider">
            <div class="slide-track">
                <img src={data[0]["cover"].url}/>
                <img src={data[1]["cover"].url}/>
                <img src={data[2]["cover"].url}/>
                <img src={data[3]["cover"].url}/>
                <img src={data[4]["cover"].url}/>
                <img src={data[5]["cover"].url}/>
                <img src={data[6]["cover"].url}/>
                <img src={data[7]["cover"].url}/>
                <img src={data[8]["cover"].url}/>
                <img src={data[9]["cover"].url}/>
            </div>
            <div class="slide-track">
                <img src={data[0]["cover"].url}/>
                <img src={data[1]["cover"].url}/>
                <img src={data[2]["cover"].url}/>
                <img src={data[3]["cover"].url}/>
                <img src={data[4]["cover"].url}/>
                <img src={data[5]["cover"].url}/>
                <img src={data[6]["cover"].url}/>
                <img src={data[7]["cover"].url}/>
                <img src={data[8]["cover"].url}/>
                <img src={data[9]["cover"].url}/>
            </div>
          </div>
        )}
      </div>
    )
}

export default GameCarousel;