import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/DataPage.css'
import useFetch from '../components/useFetch';
import tv from '../images/tv.png';

const DataPage = () => {
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

    const data = useFetch('/igdb/games', 'POST', searchQuery ? `fields *, cover.*; search "${searchQuery}"; limit 10;` : null);

    useEffect(() => {
      if (data) {
        if (data.length === 0) {
          setIsFound(false)
        } else {
          setIsFound(true)
        }
        setFirstSearch(false)
      }
    }, [data]);

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
          <img className='before-search' src={tv} alt="Loading..." />
        ) : (
          isFound ? (
            <div>
              {data && (
                <table>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="cover-container">
                          {item["cover"] && item["cover"].url ? (
                            <img className="game-cover" src={item["cover"].url.replace('t_thumb', 't_1080p')} alt={item.name} />
                          ) : (
                            <span style={{color: 'white'}}>No image available</span>
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
            <h1 className='no-res'>No Results Found</h1>
          )
        )}
      </div>
    );
  }
  
  export default DataPage;
