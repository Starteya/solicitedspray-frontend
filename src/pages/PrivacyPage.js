// src/pages/PrivacyPage.module.js

import React, { useEffect } from 'react';
import {Link } from 'react-router-dom';
import styles from './PrivacyPage.module.css';

function PrivacyPage() {
    
    useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component is mounted
  }, []); // Empty dependency array ensures this runs only once when the component is first rendered

  return (
    <div className={styles.privacyPage}>
      { /* Top Links */}
      <div className={styles.topLinks}>
      <Link to="/">Home</Link>
      </div>
      
      <div className={styles.mainContent}>
      <h1>Privacy</h1>
      <h2>Introduction</h2>
      <p>
      Welcome to Solicited Spray! Our website serves as an aggregator of climbing-related video content, primarily beta videos. We do not host any videos directly; instead, we link to content hosted on external platforms such as Vimeo and YouTube. All content displayed is the property of its respective owners/hosts. Videos are aquired through algorithmic filtering. We cannot always garuntee the accuracy of our algorithm and unrelated videos may be displayed. Please contact us if you believe a video needs to be removed.
      
      <br/><br/>By using this website, you agree to the terms outlined in this Privacy Policy. Please read it carefully to understand how we collect, use, and protect your information.
      </p>
      {/*<h2>Account Policy</h2>
      <p>
      If you choose to create an account on Solicited Spray, your personal information will not be shared with any third parties. We will not send marketing or promotional emails. The account is purely for your own benefit, allowing you to save content and preferences.
      
    <ul>
      <li>What we track: The only information we track is when you last logged in. This is securely stored in our database. No other activities are tracked via your account.</li> 
      <li>Account deletion: If you wish to remove your account or update your information, please contact us.</li>
      <li>Third-party account linking: You may choose to log in using a third-party service (such as Google, Reddit, or GitHub). We only require the minimum necessary information (e.g., username and email) for login purposes. We do not share your third-party account information with anyone.</li>
      </ul>
    </p>*/}
    <h2>Cookie Policy</h2>
    <p>
    By using Solicited Spray, you consent to the use of cookies. Cookies are small text files that store information about your interactions with the website. The cookies we use fall into the following categories: <ul>
      Required cookies:
        <li>These cookies are necessary for basic functionality, such as keeping you logged in when you return. </li>
            <br/>Analytics cookies: <li>We use cookies to collect anonymized data about how you interact with the site (e.g., device type, pages viewed, time spent on the site, and your geographic location). This data is used to improve the website experience and is stored securely by Google Analytics. For more information about cookies, please visit <a href="https://www.internetcookies.com">InternetCookies.com</a> <br/>You can also contact us with any questions or concerns regarding cookies.</li>
    </ul>
    </p>
    <h2>Personal Information Policy</h2>
    <p>
        <ul>
        <li>Pages Visited</li>
        <li>Time Spent on the website</li>
        <li>Referral source (where you came from)</li>
        <li>Date and time of visit</li>
        <li>Device type, browser type, and operating system</li>
        <li>IP address and general location (city or region)</li>
    </ul>
    We do not collect personal information such as your name, email address, phone number, or physical address unless you voluntarily provide it (e.g., when contacting us).
    
        <ul>
    
        {/*<li>Account-related data: If you create an account on Solicited Spray, your username and email address (from the third-party service you used to log in) will be stored securely. This data is used exclusively for login purposes and to personalize your experience on the site.</li>*/}
        <li>Google Analytics: We use Google Analytics to collect traffic data. This data is anonymized and aggregated and is used to improve the website’s performance. No personal data is linked to your account or actions.</li>
    </ul>
    We do not track any individual behavior or actions while using your account on the site.
    </p>
<h2>Embedded Media and Terms of Service for External Platforms
</h2>
    <p>
    {/*<h3>Instagram Terms of Service</h3>
    Solicited Spray displays embedded Instagram videos. We do not use the Instagram API for these videos. By using our website, you agree to the<a href="https://help.instagram.com/581066165581870/">Instagram Terms of Service.</a>*/}
    <h3>Vimeo Terms of Service</h3>
    We utilize Vimeo for video hosting and the Vimeo API to collect video details. By using Solicited Spray, you agree to the <a href="https://vimeo.com/terms">Vimeo Terms of Service </a>and the <a href="https://developer.vimeo.com/guidelines/terms">Vimeo API Terms of Service. </a>We collect video details such as titles, descriptions, and thumbnails through the Vimeo API.
    <h3>YouTube Terms of Service</h3>
    We use YouTube for video hosting and the YouTube API to collect video details. By using Solicited Spray, you agree to the <a href="https://www.youtube.com/static?template=terms">YouTube Terms of Service</a> and <a href="https://policies.google.com/terms?hl=en-US">Google Terms of Service. </a> The following data is collected via the YouTube API:
    <ul>
        <li>Video Title</li>
    <li>Video Description</li>
    <li>Video images/thumbnails</li>
    </ul>
    We refresh this data at least every 30 days to ensure it is up-to-date. Any changes made by the video owner (such as making the video private) is not stored in any way. The data presented on this site represents the most recent available data (within past 30 days) from the YouTube API.
    </p>
    <h2>Unlisting Videos</h2>
    <p>
    If you do not wish to have your videos listed on Solicited Spray, you can unlist them in one of two ways:
    <ul>
        <li>Make your videos private: You can set your profile or videos to private. Initially, the links will still appear on the site, but the videos will be broken and only accessible to users with the appropriate privacy settings on the respective platform (e.g., "Followers Only" on Instagram). Your new privacy settings will be detected by our server, and your videos will be unlisted from Solicited Spray. You can expedite this process by notifying us via email.</li>
    <li>Request removal: If you'd prefer to have your videos removed manually, you can contact us directly. After verifying your identity, we will remove all of your videos from the site and prevent new videos from appearing.</li>
    </ul>
    </p>
    <h2>Changes to this Privacy Policy</h2>
    <p>
    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the "Last Updated" date at the bottom will be revised accordingly.
    </p>
    <h3>Last Updated: February 4, 2025</h3>
    </div>
      </div>
  );
}

export default PrivacyPage;