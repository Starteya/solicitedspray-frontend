// src/api/api.js

import axios from 'axios';

const API_BASE_URL = 'https://api.solicitedspray.com';

export const fetchRoutes = (query) =>
  axios.get(`${API_BASE_URL}/api/routes/search`, { params: { query } });

export const fetchRouteDetails = (id) =>
  axios.get(`${API_BASE_URL}/api/routes/${id}`);