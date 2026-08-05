// src/App.js

import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useLocation 
} from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import AddVideoPage from './pages/AddVideoPage';
import RoutePage from './pages/RoutePage';

// Components
import SearchBar from './components/SearchBar'; // Make sure path is correct

// CSS
import './App.css';

// Layout wrapper to access useLocation
function App() {
  const location = useLocation();
  const hideHeaderSearch = location.pathname === '/'; // Hide on homepage

  return (
    <div className="App">
      {/* === 🌐 Header: Always visible === */}
      <header className="app-header">
        <h1 
          onClick={() => window.location = '/'} 
          style={{ cursor: 'pointer', margin: 0 }}
        >
          SolicitedSpray
        </h1>

        {/* 🔍 Show SearchBar in header everywhere EXCEPT home */}
        {!hideHeaderSearch && <SearchBar />}
      </header>

      {/* === 📦 Main Content === */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/route/:id" element={<RoutePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/add-video" element={<AddVideoPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Wrap in Router
export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}