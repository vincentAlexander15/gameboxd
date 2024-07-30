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

    const url = '/igdb/games';
    const method = 'POST';
    const body = searchQuery ? `fields *, cover.*; search "${searchQuery}"; limit 500;` : null;
    // Fetch data for the main search
    const data = useFetch(url, method, body)
    const [processedData, setProcessedData] = useState([]);

    useEffect(() => {
      if (data) {
        const filteredData = data.filter(game => game.rating_count > 1);
        const sortedData = filteredData.sort((a, b) => b.rating - a.rating);
        setProcessedData(sortedData);
        if (sortedData.length === 0) {
          setIsFound(false)
        } else {
          setIsFound(true)
        }
        setFirstSearch(false)
      }
    }, [data]);

    return (
      <div className="main">
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
            <PageNav data={processedData}/>
          ) : (
            <h1 className='no-res'>No Results Found</h1>
          )
        )}
        <Footer/>
      </div>
    );
  }
  
  export default DataPage;
