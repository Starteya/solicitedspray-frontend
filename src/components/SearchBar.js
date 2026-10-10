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
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchBarRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Function to fetch results using fetchRoutes - from backend
  useEffect(() => {
    const searchQuery = query.trim();
    if (!isOpen || !searchQuery) {
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
  }, [query, isOpen]);

  // Clear autocomplete dropdown on every navigation
  useEffect(() => {
    setIsOpen(false);
    setResults([]);
  }, [location.key]);

  // Handle clicking on a result
  const handleResultClick = (result) => {
    setIsOpen(false);
    navigate(`/route/${result._id}`);
  };

  // JSX defines the UI
  return (
    <div className={styles.searchBar} ref={searchBarRef}>
      <form onSubmit={handleSearch} autoComplete="off">
        <input
          type="text"
          placeholder="Search for routes or crags"
          maxLength={100}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
        />
        <button type="submit">Search</button>
      </form>

      {isOpen && results.length > 0 && query.trim() !== '' && (
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