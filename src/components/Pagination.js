// src/components/Pagination.js

import React from 'react';
import './Pagination.css'; // Import the CSS file

function Pagination({ currentPage, totalPages, onPageChange, totalResults }) {
  const pageNumbers = [];

  // Generate page numbers with a maximum of 5 pages displayed at once
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
  let endPage = startPage + maxPageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`pagination-button ${number === currentPage ? 'active' : ''}`}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>

      <span className="pagination-info">
        Total Results: {totalResults}
      </span>
    </div>
  );
}

export default Pagination;