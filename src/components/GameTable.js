import React, { useState, useEffect } from 'react';
import '../styles/DataPage.css'
import { useLocation, useNavigate } from 'react-router-dom';
import FavButton from './favButton';

const GameTable = ({currentPage, data}) => {
    const navigate = useNavigate();
    const gamesPerPage = 10;

    const handleClick = (item) => {
        navigate('/GamePage', {state : { gameData : item}});
    };

    // Calculate the index of the first and last game on the current page
    const indexOfLastGame = Math.min(currentPage * gamesPerPage, data.length);
    const indexOfFirstGame = (currentPage * gamesPerPage) - gamesPerPage;

    // Get the games for the current page
    const currentGames = data.slice(indexOfFirstGame, indexOfLastGame);

    return (
        <div>
            {currentGames && (
            <table>
                <tbody>
                {currentGames.map((item, index) => (
                    <tr key={index}>
                    <td className="cover-container">
                    {item["cover"] && item["cover"].url ? (
                        <img className="game-cover" src={item["cover"].url.replace('t_thumb', 't_1080p')} alt={item.name} onClick={() => handleClick(item)}/>
                    ) : (
                        <span style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256.66px', border: '3px solid white'}}>No image available</span>
                    )}
                    </td>
                    <td className="description">
                        <div style={{ display: 'block', textAlign: 'left'}} onClick={() => handleClick(item)}>
                        <h1 className="game-title">{item.name}</h1>
                        </div>
                        <p className='game-desc'>{item.summary}</p>
                    </td>
                    <td className="button-column">
                        <FavButton key={item.id} gameID={item.id}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    );
};

export default GameTable;
