import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = ({ token, onAdd }) => {
  const [formData, setFormData] = useState({
    type: 'transport',
    value: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/activities`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ type: 'transport', value: '', description: '' });
      onAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="type">Activity Type</label>
        <select 
          id="type"
          className="form-select" 
          name="type" 
          value={formData.type} 
          onChange={handleChange}
        >
          <option value="transport">Transport (Miles Driven)</option>
          <option value="diet">Diet (Meat Meals)</option>
          <option value="energy">Energy (kWh Used)</option>
        </select>
      </div>
      
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="value">Value</label>
        <input 
          id="value"
          className="form-input" 
          type="number" 
          name="value" 
          value={formData.value} 
          onChange={handleChange} 
          min="0"
          step="0.1"
          placeholder="Enter quantity..."
          required 
        />
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="description">Notes (Optional)</label>
        <input 
          id="description"
          className="form-input" 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="E.g., Commute to work"
        />
      </div>

      <button className="btn" type="submit" style={{ marginTop: '0.5rem' }}>
        Log Activity
      </button>
    </form>
  );
};

export default ActivityForm;
