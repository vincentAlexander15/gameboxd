import Carousel from 'react-grid-carousel';
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
          body: "fields *; sort rating desc; limit 10;"
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
      <div style={{ width: '100vw', margin: '0 auto' }}>
        <Carousel cols={5} rows={1} autoplay={3000} gap={90} loop hideArrow>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://via.placeholder.com/292x350" alt="Game 1"/>
        </Carousel.Item>
      </Carousel>
      </div>
    )
}

export default GameCarousel;