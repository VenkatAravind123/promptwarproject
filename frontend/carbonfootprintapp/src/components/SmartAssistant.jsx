import React from 'react';
import { Sparkles } from 'lucide-react';

const SmartAssistant = ({ insights }) => {
  if (!insights || !insights.recommendations) return null;

  return (
    <div className="glass-card" style={{ background: 'linear-gradient(145deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
        <Sparkles size={20} /> AI Assistant
      </h3>
      
      <p style={{ fontSize: '0.9rem' }}>
        Based on your logged data, here are personalized insights to help you reduce your footprint:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {insights.recommendations.map((rec, idx) => (
          <div key={idx} style={{ 
            background: 'rgba(0,0,0,0.2)', 
            padding: '1rem', 
            borderRadius: '8px',
            borderLeft: `4px solid ${
              rec.type === 'Transport' ? '#3b82f6' : 
              rec.type === 'Diet' ? '#10b981' : 
              rec.type === 'Energy' ? '#f59e0b' : '#c084fc'
            }`
          }}>
            <span className={`badge badge-${rec.type}`} style={{ marginBottom: '0.5rem' }}>
              {rec.type}
            </span>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              {rec.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartAssistant;
