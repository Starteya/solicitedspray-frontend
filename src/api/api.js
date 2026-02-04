// src/api/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchRoutes = (query) =>
  axios.get(`${API_BASE_URL}/api/routes/search`, { params: { query } });

export const fetchRouteDetails = (id) =>
  axios.get(`${API_BASE_URL}/api/routes/${id}`);