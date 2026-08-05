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
import SearchBar from './components/SearchBar';

// CSS
import './App.css';

function App() {
  const location = useLocation();

  // Hide the entire sticky header on the homepage only
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      {/* Header is completely hidden on Home */}
      {!isHome && (
        <header className="app-header">
          <h1 
            onClick={() => window.location = '/'} 
            style={{ cursor: 'pointer', margin: 0 }}
          >
            SolicitedSpray
          </h1>
          <SearchBar />
        </header>
      )}

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

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}