// src/components/Pagination.js

import React from 'react';
import styles from './Pagination.module.css'; // Import the CSS file

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
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.paginationButton} ${number === currentPage ? styles.active : ''}`}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        Next
      </button>

      <span className={styles.paginationInfo}>
        Total Results: {totalResults}
      </span>
    </div>
  );
}

export default Pagination;