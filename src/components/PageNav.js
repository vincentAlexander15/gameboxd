import React, { useState, useEffect } from 'react';
import GameTable from "./GameTable";
import '../styles/PageNav.css';

const PageNav = ({ data }) => {
    const totalResults = data.length;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalResults / 10);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);
    
    const goLeft = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goRight = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goLeftMost = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const goRightMost = () => {
        setCurrentPage(totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate the page numbers based on the current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <GameTable data={data} currentPage={currentPage} />
            <div className="pageNav">
                <button className="pageFirst" onClick={goLeftMost}>{"<<"}</button>
                <button className="pageLeft" onClick={goLeft}>{"<"}</button>
                {pageNumbers.map((number) => (
                    <button className={`pageNumbers ${currentPage === number ? 'active' : ''}`} key={number} onClick={() => goToPage(number)}>{number}</button>
                ))}
                <button className="pageRight" onClick={goRight}>{">"}</button>
                <button className="pageLast" onClick={goRightMost}>{">>"}</button>
            </div>
        </div>
    );
};

export default PageNav;
