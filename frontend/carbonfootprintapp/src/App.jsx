import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <header className="app-header">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Leaf size={28} color="var(--primary-color)" />
          <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '-0.025em' }}>
            EcoSmart AI
          </span>
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                Dashboard
              </Link>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          )}
        </div>
      </header>
      
      <main style={{ minHeight: 'calc(100vh - 160px)' }}>
        <Routes>
          <Route 
            path="/" 
            element={<LandingPage token={token} />} 
          />
          <Route 
            path="/login" 
            element={!token ? <Auth setToken={setToken} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} 
          />
          {/* Catch-all route redirecting back to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

