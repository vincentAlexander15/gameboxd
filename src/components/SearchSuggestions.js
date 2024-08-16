import React, { useState, useEffect, useRef } from 'react';
import useFetch from '../components/useFetch';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchSuggestions.css';

const SearchSuggestions = ({ className, inputValue, setInputValue }) => {
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const [openInput, setOpenInput] = useState(false);
    const suggestionsRef = useRef(null);

    // Fetch data for the search suggestions
    const suggestionData = useFetch('/igdb/games', 'POST', inputValue ? `fields *, cover.*; search "${inputValue}"; limit 10;` : null);

    useEffect(() => {
        if (inputValue) {
            setSuggestions(suggestionData); // Update suggestions state
            setOpenInput(true);
        } else {
            setSuggestions([]); // Clear suggestions if input is empty
        }
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setSuggestions([]);
                setOpenInput(false);
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
                setOpenInput(false);
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

    const handleGameSearch = () => {
        if (inputValue.trim() !== '') {
          navigate('/DataPage', {state : { searchQuery: inputValue, gameSearch: true}});
        }
        setSuggestions([]);
        setOpenInput(false);
      };  

    const handleUserSearch = () => {
        if (inputValue.trim() !== '') {
            navigate('/DataPage', {state : { searchQuery: inputValue.trim(), gameSearch: false }});
          }
        setSuggestions([]);
        setOpenInput(false);
    }

    //TODO: fix suggestions bug when name is too big, keep 'in games' and 'in people' no matter what user puts in
    return (
        <div className={`suggestion-${className}`} ref={suggestionsRef}>
            {inputValue && openInput && (
                <>
                    <div className='suggestion' onClick={() => handleGameSearch()}>
                        <p>Search for {inputValue} in Games</p>
                    </div>
                    <div className='suggestion' onClick={() => handleUserSearch()}>
                        <p>Search for {inputValue} in People</p>
                    </div>
                </>
            )}
            {suggestions && suggestions.map((suggestion, index) => (
                <div key={index} className='suggestion' onClick={() => handleClick(suggestion)}>
                    <p>{suggestion.name}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchSuggestions;
