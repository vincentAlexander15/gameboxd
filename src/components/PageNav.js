import React, { useState, useEffect } from 'react';
import GameTable from "./GameTable";

const ResultsPerPage = 10;

const PageNav = ({ data }) => {
    const totalResults = data.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const totalPages = Math.ceil(totalResults / ResultsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);
    
    const goLeft = () => {
        if (currentPage > 1) {
            const newCurrentPage = currentPage - 1;
            setCurrentPage(newCurrentPage);
            updatePageNumbers(newCurrentPage);
        }
    };

    const goRight = () => {
        if (currentPage < totalPages) {
            const newCurrentPage = currentPage + 1;
            setCurrentPage(newCurrentPage);
            updatePageNumbers(newCurrentPage);
        }
    };
    
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        updatePageNumbers(pageNumber);
    };

    const updatePageNumbers = (newCurrentPage) => {
        if (newCurrentPage === pageNumbers[pageNumbers.length - 1] && newCurrentPage >= 5 && totalPages > 5) {
            const minPage = newCurrentPage - 2;
            const maxPage = Math.min(totalPages, newCurrentPage + 2);
            const idxs = [];
            for (let i = minPage; i <= maxPage; i++) {
                idxs.push(i);
            }
            setPageNumbers(idxs);
        } else if (newCurrentPage === pageNumbers[0] && newCurrentPage > 1 && totalPages > 5) {
            const minPage = newCurrentPage - 2;
            const maxPage = Math.min(totalPages, newCurrentPage + 2);
            const idxs = [];
            for (let i = minPage; i <= maxPage; i++) {
                idxs.push(i);
            }
            setPageNumbers(idxs);
        }
    };

    useEffect(() => {
        const idxs = [];
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            idxs.push(i);
        }
        setPageNumbers(idxs);
    }, [totalPages]);

    return (
        <div className="pageNav">
            <GameTable data={data} currentPage={currentPage} />
            <button className="pageLeft" onClick={goLeft}>{"<"}</button>
            {pageNumbers.map((number) => (
                <button key={number} onClick={() => goToPage(number)}>{number}</button>
            ))}
            <button className="pageRight" onClick={goRight}>{">"}</button>
        </div>
    );
};

export default PageNav;
