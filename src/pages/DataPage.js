import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../styles/DataPage.css'
import useFetch from '../components/useFetch';
import tv from '../images/tv.png';
import PageNav from '../components/PageNav';
import SearchSuggestions from '../components/SearchSuggestions';
import Footer from '../components/Footer';

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

    // Fetch data for the main search
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
      <div style={{position: 'relative', minHeight: '100vh'}}>
        <Navbar/>
        <div className="main-search">
          <form onSubmit={handleSubmit} className="main-search-form">
            <input
              id='main-search-input'
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <SearchSuggestions className={'explore'} inputValue={inputValue} setInputValue={setInputValue} />
          </form>
        </div>
        { firstSearch ? (
          <img className='before-search' src={tv} alt="Loading..." />
        ) : (
          isFound ? (
            <PageNav data={data}/>
          ) : (
            <h1 className='no-res'>No Results Found</h1>
          )
        )}
        <Footer/>
      </div>
    );
  }
  
  export default DataPage;
