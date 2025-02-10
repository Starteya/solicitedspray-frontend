// src/api/api.js

import axios from 'axios';

// Dynamically set API_BASE_URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchRoutes = (query) =>
  axios.get(`${API_BASE_URL}/routes/search`, { params: { query } });

export const fetchRouteDetails = (id) => axios.get(`${API_BASE_URL}/routes/${id}`);