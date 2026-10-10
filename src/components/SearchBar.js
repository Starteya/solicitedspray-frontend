// src/components/SearchBar.js
// A search bar that provides live-search auto complete from the route database

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { fetchRoutes } from '../api/api'; // import fetchRoutes function which fetches data from backend

// React Component
function SearchBar() {
  const [query, setQuery] = useState(''); // state variable
  const [results, setResults] = useState([]); // state variable
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setResults([]);                       // clears dropdown immediately
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  // Function to fetch results using fetchRoutes - from backend
  useEffect(() => {
    const searchQuery = query.trim();
    if (!searchQuery) {
      setResults([]);
      return undefined;
    }

    setResults([]);
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetchRoutes(searchQuery, { signal: controller.signal });
        if (controller.signal.aborted) return;
        const routes = response?.data?.routes;
        setResults(Array.isArray(routes) ? routes.slice(0, 5) : []);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Error fetching results', error);
        setResults([]);
      }
    }, 250);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, location.key]);

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
          maxLength={100}
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