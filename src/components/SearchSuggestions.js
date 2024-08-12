import React, { useState, useEffect, useRef } from 'react';
import useFetch from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchSuggestions.css';

const SearchSuggestions = ({ className, inputValue, setInputValue }) => {
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const suggestionsRef = useRef(null);

    // Fetch data for the search suggestions
    const suggestionData = useFetch('/igdb/games', 'POST', inputValue ? `fields *, cover.*; search "${inputValue}"; limit 10;` : null);

    useEffect(() => {
        if (inputValue) {
            setSuggestions(suggestionData); // Update suggestions state
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSuggestions([]);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClick = (item) => {
        setSuggestions([]);
        navigate('/GamePage', {state : { gameData : item}});
    };

    //TODO: fix suggestions bug when name is too big, keep 'in games' and 'in people' no matter what user puts in
    return (
        <div className={`suggestion-${className}`} ref={suggestionsRef}>
            {suggestions && suggestions.map((suggestion, index) => (
                <div key={index} className='suggestion' onClick={() => handleClick(suggestion)}>
                    <p>{suggestion.name}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchSuggestions;
