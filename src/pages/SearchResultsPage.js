// src/pages/SearchResultsPage.js
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RouteList from '../components/RouteList';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
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

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';
  const page = parseInt(queryParams.get('page')) || 1;

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setError('No search query provided.');
      return;
    }

    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/routes/search`, {
          params: { query, page }
        });
        setRoutes(response.data.routes);
        setTotalResults(response.data.totalResults);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setError(null);
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError('Error fetching routes. Please try again.');
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [query, page]);

  const handlePageChange = (pageNumber) => {
    navigate(`/search?query=${encodeURIComponent(query)}&page=${pageNumber}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className={styles.searchResultsPage}>
        <div className={styles.topLinks}>
          <Link to="/">Home</Link>
        </div>
        <div className={styles.message}>{error}</div>
      </div>
    );
  }

  // No routes found (with suggestiom)
  if (routes.length === 0) {
    return (
      <div className={styles.searchResultsPage}>
        <div className={styles.topLinks}>
          <Link to="/">Home</Link>
        </div>

        <div className={styles.centerContainer}>
          <div className={styles.smallLogo}>Solicited Spray</div>

          <div className={styles.noResults}>
            <div className={styles.message}>
              No routes found for "<strong>{query}</strong>".
            </div>
            <div className={styles.suggestion}>
              Try refining your search, check spelling, or use a crag name like "Red Rock".
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

  // show results  
  return (
    <div className={styles.searchResultsPage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
      </div>

      <div className={styles.centerContainer}>
        <h2>Search Results for "{query}"</h2>
        <RouteList routes={routes} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
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