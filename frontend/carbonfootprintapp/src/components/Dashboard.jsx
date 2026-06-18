import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ActivityForm from './ActivityForm';
import SmartAssistant from './SmartAssistant';
import { Activity, Leaf, Zap, Car } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']; // Transport, Diet, Energy

const Dashboard = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [actRes, insRes] = await Promise.all([
        axios.get('http://localhost:5000/api/activities', { headers }),
        axios.get('http://localhost:5000/api/assistant/insights', { headers })
      ]);
      setActivities(actRes.data);
      setInsights(insRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleActivityAdded = () => {
    fetchData(); // Refresh data
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Dashboard...</div>;

  const chartData = insights && insights.breakdown ? [
    { name: 'Transport', value: insights.breakdown.transportCo2 },
    { name: 'Diet', value: insights.breakdown.dietCo2 },
    { name: 'Energy', value: insights.breakdown.energyCo2 }
  ] : [];

  return (
    <div className="grid-layout">
      {/* Left Column: Charts and Activities */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Top Summary Card */}
        <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Leaf color="var(--primary-color)" /> Total Carbon Footprint
            </h2>
            <p style={{ margin: 0 }}>Estimated emissions based on your logged activities.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {insights?.totalCo2.toFixed(1)}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>kg CO2e</span>
          </div>
        </div>

        {/* Visualizations & Form Grid */}
        <div className="grid-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
          
          {/* Chart */}
          <div className="glass-card">
            <h3>Emissions Breakdown</h3>
            {insights?.totalCo2 > 0 ? (
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '2rem' }}>No data to visualize yet.</p>
            )}
          </div>

          {/* Add Activity Form */}
          <div className="glass-card">
            <h3><Activity size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }}/> Log Activity</h3>
            <ActivityForm token={token} onAdd={handleActivityAdded} />
          </div>
        </div>
      </div>

      {/* Right Column: AI Assistant & History */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <SmartAssistant insights={insights} />
        
        <div className="glass-card" style={{ flexGrow: 1 }}>
          <h3>Recent History</h3>
          {activities.length === 0 ? (
            <p>No activities logged.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activities.slice(0, 5).map(act => (
                <div key={act._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {act.type === 'transport' && <Car size={18} color="#3b82f6" />}
                    {act.type === 'diet' && <Leaf size={18} color="#10b981" />}
                    {act.type === 'energy' && <Zap size={18} color="#f59e0b" />}
                    <div>
                      <span style={{ fontWeight: 500, textTransform: 'capitalize', display: 'block' }}>{act.type}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.description || 'Logged entry'}</span>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>+{act.co2e.toFixed(1)} kg</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
