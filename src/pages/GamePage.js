import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import useFetch from '../components/useFetch';

const GamePage = () => {
    const location = useLocation();
    const { gameData } = location.state || {};

    const url = '/igdb/release_dates';
    const method = 'POST';
    const body = `fields game, date, human; where game = ${gameData.id}; sort date asc; limit 10;`;
    const releaseDates = useFetch(url, method, body);

    return (
        <div>
            <Navbar/>
            <h1>{gameData ? gameData.name : "Loading..."}</h1>
            <h1>
                {/* grab oinly first date */}
                {releaseDates && releaseDates[0].human}
            </h1>
        </div>
    );
}

export default GamePage;
