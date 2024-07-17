import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/DataPage.css'
import useFetch from '../components/useFetch';
import tv from '../images/tv.png';
import PageNav from '../components/PageNav';

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

    const data = useFetch('/igdb/games', 'POST', searchQuery ? `fields *, cover.*; search "${searchQuery}"; limit 500;` : null);

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
            <PageNav data={data}/>
          ) : (
            <h1 className='no-res'>No Results Found</h1>
          )
        )}
      </div>
    );
  }
  
  export default DataPage;
