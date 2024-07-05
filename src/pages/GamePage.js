import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import useFetch from '../components/useFetch';
import '../styles/GamePage.css';

const GamePage = () => {
    //Retrieve data from DataPage
    const location = useLocation();
    const { gameData } = location.state || {};
    
    //Make API calls using useFetch
    const url = '/igdb/release_dates';
    const method = 'POST';
    const body = `fields game, date, human; where game = ${gameData.id}; sort date asc; limit 1;`;
    const scs = useFetch('/igdb/screenshots', method, `fields *; where game = ${gameData.id}; limit 10;`);
    const releaseDates = useFetch(url, method, body);

    // //Cycles game screenshots for each page
    const ScreenshotCarousel = ({scs}) => {
        const [currentIdx, setCurrentIdx] = useState(0);
        const [fade, setFade] = useState(false);
    
        useEffect(() => {
            const updateIndex = () => {
                setFade(true);
                setTimeout(() => {
                    setCurrentIdx(prevIndex => (prevIndex + 1) % scs.length);
                    setFade(false);
                }, 500); // adjust as needed
            };
            const validIdx = setInterval(updateIndex, 4000); // adjust as needed
            return () => clearInterval(validIdx);
        }, [scs]);
    
        if (scs.length === 0) {
            return (
                <div>No Images Found</div>
            )
        }
    
        return (
            <div className="game_scs">
                <div 
                    className="background-image"
                    style={{
                        backgroundImage: `url(${scs[currentIdx].url.replace('t_thumb', 't_1080p')})`,
                        opacity: fade ? 0 : 1, 
                        transition: 'opacity 0.5s'
                    }}
                />
            </div>
        );
        
        
    };

    return (
        <div>
            <Navbar/>
            {scs ? <ScreenshotCarousel scs={scs} /> : <div>Loading screenshots...</div>}
            <div class="container">
                <h1>{gameData ? gameData.name : "Loading..."}</h1>
                <h1>
                    {releaseDates && releaseDates[0].human}
                </h1>
            </div>
        </div>
    );
}

export default GamePage;
