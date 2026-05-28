// src/components/SearchBar.js
// A search bar that provides live-search auto complete from the route database

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { fetchRoutes } from '../api/api'; // import fetchRoutes function which fetches data from backend

// React Component
function SearchBar() {
  const [query, setQuery] = useState(''); // state variable
  const [results, setResults] = useState([]); // state variable
  const navigate = useNavigate(); // React component to change pages
  const timerRef = useRef(null); // used for debouncing the search requests

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) { // remove spaces
      navigate(`/search?query=${encodeURIComponent(query)}`); // ensures special chars are safe in url
    }
  };

  // Function to fetch results using fetchRoutes - from backend
  const getSearchResults = async (searchQuery) => {
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

  try {
    const response = await fetchRoutes(searchQuery);
    // Assuming the response data is an array of routes
    const routes = response.data.routes;

    // Set top 5 results
    setResults(routes.slice(0, 5)); // Adjust as needed
  } catch (error) {
    console.error('Error fetching results', error);
    setResults([]);
  }
};

// Effect to handle debounced search queries. 
  useEffect(() => {
    // Clear the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // If the query is empty, don't search empty strings
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Set a new timer to fetch results after 100ms, 
    timerRef.current = setTimeout(() => {
      getSearchResults(query);
    }, 100);

    // Cleanup function to clear the timer when the component unmounts or query changes
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  // Handle clicking on a result
  const handleResultClick = (result) => {
    // Navigate to the result's page or set the query
    navigate(`/route/${result._id}`); // Adjust the path according to your routes
  };

// JSX defins the UI
  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch} autoComplete="off">
        {/*controlled component*/}
        <input
          type="text"
          placeholder="Search for routes or crags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && query.trim() !== '' && (
        <ul className={styles.searchResults}>
          {results.map((result) => {
            return (<li key={result._id} onClick={() => handleResultClick(result)}>
       <strong>{result.name}</strong>
       <br/>
       <em>{result.crag}</em> - <em>{result.area}</em>
       {/* Assuming result.crag exists */}
          </li>
          );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;