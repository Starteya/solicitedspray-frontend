// src/pages/SearchResultsPage.js
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RouteList from '../components/RouteList'; // route data
import Spinner from '../components/Spinner'; // for loading
import Pagination from '../components/Pagination'; // Import pagination
import SearchBar from '../components/SearchBar'; // Import the search bar component
import styles from './SearchResultsPage.module.css';


function SearchResultsPage() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

// Parse query parameters
const queryParams = new URLSearchParams(location.search);
const query = queryParams.get('query') || '';
const page = parseInt(queryParams.get('page')) || 1;

useEffect(() => {
  if (!query) {
    // Handle missing query parameter
    setLoading(false);
    setError('No search query provided.');
    return;
  }

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      // Use environment variable for API base URL
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/routes/search`, {
        params: { query, page },
      });
      setRoutes(response.data.routes);

      setTotalResults(response.data.totalResults);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setError(null);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setError('Error fetching routes. Please try again later.');
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRoutes();
}, [query, page]);

const handlePageChange = (pageNumber) => {
  // Update the URL with the new page parameter
  navigate(`/search?query=${encodeURIComponent(query)}&page=${pageNumber}`);
};

if (loading) {
  return <Spinner/>;
}

if (error) {
  return <div>{error}</div>;
}

if (routes.length === 0) {
    return (
      <div className={styles.searchResultsPage}>
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
      </div>
  
  
      <div className={styles.centerContainer}>
        <h1 className={styles.smallLogo}>Solicited Spray</h1>
      <SearchBar />
      <div className={styles.noResults}>
      <div className={styles.message}>
        No routes found for "<strong>{query}</strong>".
      </div>
   <div className={styles.suggestion}>
        Try refining your search, check the spelling, or remove unecessary punctuation.
      </div>
  </div>
  </div>
  
  <div className="spacer"></div>
  
  <div className={styles.bottomLinks}>
    <Link to="/contact">Contact</Link>
    <Link to="/privacy">Privacy</Link>
    </div>
  </div>
  );
}

return (
 <div className={styles.searchResultsPage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
    {/*<a href="/add-video">Add Your Video</a>*/}
      </div>

      <div className={styles.centerContainer}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : routes.length === 0 ? (
          <div className={styles.noResults}>No routes found for "{query}".</div>
        ) : (
          <>
          <SearchBar/>
            <h2>Search Results for "{query}"</h2>
            <RouteList routes={routes} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

  <div className="spacer"></div>

      {/* Bottom Links */}
      <div className={styles.bottomLinks}>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
      </div>
    </div>
);
}

export default SearchResultsPage;
