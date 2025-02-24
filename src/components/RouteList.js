// src/components/RouteList.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RouteList.module.css'; // Import the CSS file


const RouteList = ({ routes }) => {
  return (
    <div className={styles.routeList}>
      {routes.map((route) => (
        <div key={route._id} className={styles.routeListItem}>
          <Link to={`/route/${route._id}`} className={styles.routeLink}>
            <h3 className={styles.routeName}>{route.name}</h3>
            
            <p className={styles.routeDetails}>
              Grade: {route.grade} | Crag: {route.crag}
            </p>
            {/* You can include additional route information here */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RouteList;