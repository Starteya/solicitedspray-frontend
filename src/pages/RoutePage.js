// src/pages/RoutePage.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRouteDetails } from '../api/api';
import VideoEmbed from '../components/VideoEmbed';
import Spinner from '../components/Spinner'; // For loading state
import styles from './RoutePage.module.css'; // Import the CSS file

const RoutePage = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRouteDetails = async () => {
      try {
        const response = await fetchRouteDetails(id);
        setRoute(response.data);
      } catch (error) {
        console.error('Error fetching route details:', error);
      } finally {
        setLoading(false);
      }
    };

    getRouteDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!route) {
    return <div className={styles.errorMessage}>Route not found.</div>;
  }

  return (
    <div className={styles.routePage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
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