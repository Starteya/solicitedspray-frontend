// src/pages/RoutePage.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRouteDetails } from '../api/api';
import VideoEmbed from '../components/VideoEmbed';
import Spinner from '../components/Spinner'; // For loading state
import styles from './RoutePage.module.css'; // Import the CSS file

const RoutePage = () => {
  const { id } = useParams();
  const [routeState, setRouteState] = useState({
    id: null,
    route: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    setRouteState({ id, route: null, loading: true, error: null });

    const getRouteDetails = async () => {
      try {
        const response = await fetchRouteDetails(id, { signal: controller.signal });
        setRouteState({ id, route: response.data, loading: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Error fetching route details:', error);
        const status = error.response?.status;
        const message = status === 404
          ? 'Route not found.'
          : status === 400
            ? 'Invalid route link.'
            : 'Unable to load this route. Please try again later.';
        setRouteState({ id, route: null, loading: false, error: message });
      }
    };

    getRouteDetails();
    return () => controller.abort();
  }, [id]);

  if (routeState.id !== id || routeState.loading) {
    return <Spinner />;
  }

  if (routeState.error) {
    return <div className={styles.errorMessage}>{routeState.error}</div>;
  }

  const { route } = routeState;
  return (
    <div className={styles.routePage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="#" onClick={(e) => {e.preventDefault();window.history.back();}}
            style={{ fontSize: '2rem', textDecoration: 'none', color: '#ffffff' }}>←</Link>
      {/*<Link to="/add-video">Add Your Video</Link>*/}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.routeDetails}>
          <h2>
            {route.name} ({route.grade})
          </h2>
          <h3>
            {route.crag} - {route.area}
          </h3>
          <p>{route.location}</p>
        </div>

        {/* Video List */}
        <div className={styles.videoList}>
          {route.videos && route.videos.length > 0 ? (
            route.videos.map((video, index) => (
              <div key={index} className={styles.videoWrapper}>
      <VideoEmbed video={video} />
    </div>
            ))
          ) : (
            <p>No videos available for this route.</p>
          )}
        </div>
      </div>

      {/* Bottom Links */}
      <div className={styles.bottomLinks}>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
      </div>
    </div>
  );
};

export default RoutePage;