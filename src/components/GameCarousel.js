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
          body: "fields name, cover.*; where rating_count > 750 ; sort rating desc; limit 165;"
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
        <div className="parent" >
          <div>
            <div className="slider">
              <div className="slide-track">
                {data.slice(0, 50).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
              <div className="slide-track">
                {data.slice(0, 50).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="slider">
              <div className="slide-track">
                {data.slice(50, 105).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
              <div className="slide-track">
                {data.slice(50, 105).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="slider">
              <div className="slide-track">
                {data.slice(105, 165).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
              <div className="slide-track">
                {data.slice(105, 165).map((item, index) => (
                  <img key={index} src={item["cover"].url.replace('t_thumb', 't_1080p')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameCarousel;