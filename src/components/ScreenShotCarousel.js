// ScreenshotCarousel.js

import React, { useState, useEffect } from 'react';

const ScreenshotCarousel = ({scs}) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const updateIndex = () => {
            setFade(true);
            setTimeout(() => {
                setCurrentIdx(prevIndex => (prevIndex + 1) % scs.length);
                setFade(false);
            }, 500);
        };
        const validIdx = setInterval(updateIndex, 4000);
        return () => clearInterval(validIdx);
    }, [scs]);

    if (scs.length === 0) {
        return (
            <div className="noImages"></div>
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

export default ScreenshotCarousel;
