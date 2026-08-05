// src/components/SearchBar.js
// A search bar that provides live-search auto complete from the route database

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { fetchRoutes } from '../api/api'; // import fetchRoutes function which fetches data from backend

// React Component
function SearchBar() {
  const [query, setQuery] = useState(''); // state variable
  const [results, setResults] = useState([]); // state variable
  const navigate = useNavigate();
  const location = useLocation();           
  const timerRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setResults([]);                       // clears dropdown immediately
      navigate(`/search?query=${encodeURIComponent(query)}`);
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
      const routes = response?.data?.routes;

      if (!Array.isArray(routes)) {
        setResults([]);
        return;
      }
      setResults(routes.slice(0, 5));
    } catch (error) {
      console.error('Error fetching results', error);
      setResults([]);
    }
  };

  // Effect to handle debounced search queries.
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query.trim() === '') {
      setResults([]);
      return;
    }

    timerRef.current = setTimeout(() => {
      getSearchResults(query);
    }, 100);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  // Clear autocomplete dropdown on every navigation
  useEffect(() => {
    setResults([]);
  }, [location]);

  // Handle clicking on a result
  const handleResultClick = (result) => {
    setResults([]);                         //clears dropdown on click
    navigate(`/route/${result._id}`);
  };

  // JSX defines the UI
  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch} autoComplete="off">
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
          {results.map((result) => (
            <li key={result._id} onClick={() => handleResultClick(result)}>
              <strong>{result.name}</strong>
              <br />
              <em>{result.crag}</em> - <em>{result.area}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;