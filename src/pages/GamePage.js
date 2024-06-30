import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const GamePage = () => {
    const location = useLocation();
    const { gameData } = location.state || {};

    return (
        <div>
            <Navbar/>
            <h1>{gameData ? gameData.name : "Loading..."}</h1>
        </div>
    );
}

export default GamePage;