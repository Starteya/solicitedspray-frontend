// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homepage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
      {/*<Link to="/add-video">Add Your Video</Link>*/}
      </div>

      {/* Center Container */}
      <div className={styles.centerContainer}>
        <h1>Solicited Spray</h1>
        <p>A route climbing search engine</p>
        <SearchBar />
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


export default HomePage;