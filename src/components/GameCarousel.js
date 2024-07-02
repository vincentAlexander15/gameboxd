import '../styles/GameCarousel.css';
import React from 'react';
import useFetch from './useFetch';

const GameCarousel = () => {
  const url = '/igdb/games';
  const method = 'POST';
  const body = "fields name, cover.*; where rating_count > 750 ; sort rating desc; limit 165;";
  const data = useFetch(url, method, body);

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
