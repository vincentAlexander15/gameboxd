import '../styles/GameCarousel.css';
import React from 'react';
import useFetch from './useFetch';
import Slider from './Slider'; // Import the Slider component

const GameCarousel = () => {
  const url = '/igdb/games';
  const method = 'POST';
  const body = "fields name, cover.*; where rating_count > 750 ; sort rating desc; limit 165;";
  const data = useFetch(url, method, body);

  return (
    <div>
      {data && (
        <div className="parent" >
          <Slider data={data.slice(0, 50)} />
          <Slider data={data.slice(50, 105)} />
          <Slider data={data.slice(105, 165)} />
        </div>
      )}
    </div>
  );
}

export default GameCarousel;
