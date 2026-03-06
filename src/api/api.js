// src/api/api.js

import axios from 'axios'; // makes HTTP requests

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // set base url (this can change based on deployment mode)

export const fetchRoutes = (query) =>
  axios.get(`${API_BASE_URL}/api/routes/search`, { params: { query } }); // GET request for backend. text input from user

export const fetchRouteDetails = (id) =>
  axios.get(`${API_BASE_URL}/api/routes/${id}`); // GET request for backend. uses route ID from user click