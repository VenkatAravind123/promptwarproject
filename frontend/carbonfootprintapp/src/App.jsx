import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
        <h1>EcoSmart AI</h1>
        {token && (
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      
      <main>
        <Routes>
          <Route 
            path="/login" 
            element={!token ? <Auth setToken={setToken} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
