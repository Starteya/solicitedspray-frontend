// src/pages/ContactPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ContactPage.module.css"; // Import the CSS file
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: ""
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [captchaToken, setCaptchaToken] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState("");

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if captcha is solved
    if (!captchaToken) {
      setStatusError("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);
    try {
      // Send form data to backend API
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, {
        ...formData,
        captchaToken
      });
      console.log("Form submitted:", response.data);
      // Reset the form
      setFormData({ name: "", email: "", comments: "" });

      setCaptchaToken(null);
      // Reset reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.reset) {
        window.grecaptcha.reset();
      }
      // Update status message
      setStatusMessage("Thank you for your message! We will get back to you soon.");
      setStatusError("");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Check if it's a validation error
      if (error.response && error.response.status === 400) {
        const errors = error.response.data.errors;
        // Extract and display validation errors
        const errorMessages = errors.map((err) => err.msg).join(" ");
        setStatusError(`Validation Error: ${errorMessages}`);
      } else {
        setStatusError("There was an error submitting the form. Please try again later.");
      }
      setStatusMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Top Links */}
      <div className={styles.topLinks}>
        <Link to="/">Home</Link>
        {/*<Link to="/add-video">Add Your Video</Link>*/}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h1>Contact</h1>
        <p>
          If you have any questions, concerns, suggestions, etc., please feel free to contact using the form below!
          Providing an email address is optional, but if you'd like a follow-up/reply, please provide yours.
        </p>
        <p>
          <em>No marketing or other solicitation!</em>
        </p>

        {/* Display status messages */}
        {statusMessage && <div className={styles.statusMessage}>{statusMessage}</div>}
        {statusError && <div className={styles.errorMessage}>{statusError}</div>}

        {/* Contact Form */}
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field (Optional) */}
          <div className={styles.formGroup}>
            <label htmlFor="email">
              Email: <span className="optional">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address (Optional)"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Comments Field */}
          <div className={styles.formGroup}>
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Comments? Questions? Issues? Suggestions?"
              value={formData.comments}
              onChange={handleChange}
              required></textarea>
          </div>

          {/* reCAPTCHA */}
          <div className={styles.formGroup}>
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Submitting...ff" : "Submit"}
          </button>
        </form>
      </div>

      {/* Bottom Links */}
      <div className={styles.bottomLinks}>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
      </div>
    </div>
  );
}

export default ContactPage;