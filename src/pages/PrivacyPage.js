// src/pages/PrivacyPage.module.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './PrivacyPage.module.css';

function PrivacyPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.privacyPage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
      </div>

      <div className={styles.mainContent}>
        <h1>Privacy</h1>

        <h2>Introduction</h2>
        <p>
          Welcome to Solicited Spray! Our website serves as an aggregator of climbing-related video content, primarily beta videos. We do not host any videos directly; instead, we link to content hosted on external platforms such as Vimeo and YouTube. All content displayed is the property of its respective owners/hosts. Videos are acquired through algorithmic filtering. We cannot always guarantee the accuracy of our algorithm and unrelated videos may be displayed. Please contact us if you believe a video needs to be removed.
          <br /><br />
          By using this website, you agree to the terms outlined in this Privacy Policy. Please read it carefully to understand how we collect, use, and protect your information.
        </p>

        <h2>Cookie Policy</h2>
        <p>
          By using Solicited Spray, you consent to the use of cookies. Cookies are small text files that store information about your interactions with the website. The cookies we use fall into the following categories:
        </p>
        <ul>
          <li><strong>Required cookies:</strong> These cookies are necessary for basic functionality, such as keeping you logged in when you return.</li>
          <li>
            <strong>Analytics cookies:</strong> We use cookies to collect anonymized data about how you interact with the site (e.g., device type, pages viewed, time spent on the site, and your geographic location). This data is used to improve the website experience and is stored securely by Google Analytics.
            For more information about cookies, please visit <a href="https://www.internetcookies.com" target="_blank" rel="noopener noreferrer">InternetCookies.com</a>.
          </li>
        </ul>

        <h2>Personal Information Policy</h2>
        <ul>
          <li>Pages Visited</li>
          <li>Time Spent on the website</li>
          <li>Referral source (where you came from)</li>
          <li>Date and time of visit</li>
          <li>Device type, browser type, and operating system</li>
          <li>IP address and general location (city or region)</li>
        </ul>
        <p>
          We do not collect personal information such as your name, email address, phone number, or physical address unless you voluntarily provide it (e.g., when contacting us).
        </p>
        <ul>
          <li>Google Analytics: We use Google Analytics to collect traffic data. This data is anonymized and aggregated and is used to improve the website’s performance. No personal data is linked to your account or actions.</li>
        </ul>

        <h2>Embedded Media and External Platform Terms</h2>

        <h3>Vimeo Terms of Service</h3>
        <p>
          We utilize Vimeo for video hosting and the Vimeo API to collect video details. By using Solicited Spray, you agree to the <a href="https://vimeo.com/terms" target="_blank" rel="noopener noreferrer">Vimeo Terms of Service</a> and the <a href="https://developer.vimeo.com/guidelines/terms" target="_blank" rel="noopener noreferrer">Vimeo API Terms of Service</a>. We collect video details such as titles, descriptions, and thumbnails through the Vimeo API.
        </p>

        <h3>YouTube API Usage and Terms</h3>
        <p>
          Solicited Spray uses the YouTube Data API to discover and retrieve public metadata about climbing-related videos hosted on YouTube. We do not access any personal or user-authenticated data from YouTube.
        </p>
        <p>
          The following data is collected via the YouTube API:
        </p>
        <ul>
          <li>Video Title</li>
          <li>Video Description</li>
          <li>Video Thumbnails</li>
          <li>Channel ID</li>
          <li>Video ID</li>
          <li>Publish Date</li>
        </ul>
        <p>
          This data is stored securely on our backend server and refreshed at least every 30 days to ensure compliance with YouTube’s API data caching policy. If a video becomes private or is removed from YouTube, it is removed from our database during the next update cycle.
        </p>
        <p>
          By using this site, you agree to the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a> and the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
        </p>

        <h2>Unlisting Videos</h2>
        <p>
          If you do not wish to have your videos listed on Solicited Spray, you can unlist them in one of two ways:
        </p>
        <ul>
          <li>
            <strong>Make your videos private:</strong> Your new privacy settings will be detected by our server within 30 days, and the videos will be unlisted automatically. To expedite this, please notify us via email.
          </li>
          <li>
            <strong>Request removal:</strong> Contact us directly using the form or email below. After verifying your identity, we will remove all of your videos from the site and prevent future listings.
          </li>
        </ul>

        <h2>Developer Contact Information</h2>
        <p>
          Solicited Spray is developed and operated by Estrello Apps.
          <br /><br />
          <strong>Email:</strong> <a href="mailto:estrelloapps@gmail.com">estrelloapps@gmail.com</a><br />
          <strong>Website:</strong> <a href="https://www.solicitedspray.com" target="_blank" rel="noopener noreferrer">www.solicitedspray.com</a>
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the "Last Updated" date below will be updated accordingly.
        </p>
        <h3>Last Updated: September 5, 2025</h3>
      </div>
    </div>
  );
}

export default PrivacyPage;
