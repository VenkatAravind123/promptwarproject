import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  ArrowRight, 
  Shield, 
  Zap, 
  Car, 
  Sparkles, 
  Calculator, 
  BarChart3, 
  UtensilsCrossed 
} from 'lucide-react';
import '../LandingPage.css';

const LandingPage = ({ token }) => {
  const navigate = useNavigate();

  // State for the interactive calculator preview
  const [miles, setMiles] = useState(20);
  const [meatMeals, setMeatMeals] = useState(7);
  const [electricity, setElectricity] = useState(300);

  // Carbon math conversions (estimates)
  // 1 mile driven = ~0.4 kg CO2e
  // 1 meat-heavy meal = ~1.5 kg CO2e
  // 1 kWh electricity = ~0.45 kg CO2e
  const dailyTransport = miles * 0.4;
  const dailyDiet = (meatMeals * 1.5) / 7;
  const dailyEnergy = (electricity * 0.45) / 30;

  const totalDaily = dailyTransport + dailyDiet + dailyEnergy;
  const totalMonthly = totalDaily * 30;

  // Impact evaluation
  let impactLevel = 'Moderate';
  let badgeColor = '#f59e0b';
  let badgeBg = 'rgba(245, 158, 11, 0.15)';
  let advice = 'Your carbon footprint is average. Minor changes can make a big difference!';

  if (totalMonthly < 200) {
    impactLevel = 'Low (Eco Hero!)';
    badgeColor = '#10b981';
    badgeBg = 'rgba(16, 185, 129, 0.15)';
    advice = 'Amazing job! Your lifestyle shows strong carbon efficiency.';
  } else if (totalMonthly > 500) {
    impactLevel = 'High';
    badgeColor = '#ef4444';
    badgeBg = 'rgba(239, 68, 68, 0.15)';
    advice = 'Your footprint is quite high. EcoSmart AI can help target your primary emissions!';
  }

  // Smart suggestions preview based on highest emission category
  const getAiSuggestion = () => {
    const transportPct = (dailyTransport / totalDaily) * 100;
    const dietPct = (dailyDiet / totalDaily) * 100;
    const energyPct = (dailyEnergy / totalDaily) * 100;

    if (transportPct >= dietPct && transportPct >= energyPct && miles > 10) {
      return `💡 AI Suggestion: Carpooling or public transit for just 2 days a week would trim your transport footprint by ${(miles * 0.4 * 8).toFixed(1)} kg CO2e monthly.`;
    } else if (dietPct >= transportPct && dietPct >= energyPct && meatMeals > 3) {
      return `💡 AI Suggestion: Swapping 3 meat-based meals for plant-based options weekly would save about 4.5 kg CO2e.`;
    } else if (electricity > 150) {
      return `💡 AI Suggestion: Switching to energy-efficient LED light bulbs and upgrading appliance power modes can cut your energy footprint by ${(electricity * 0.45 * 0.15).toFixed(1)} kg CO2e monthly.`;
    }
    return `💡 AI Suggestion: Log your daily habits in the app to get deeply personalized recommendation paths.`;
  };

  const handleCta = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={16} /> Empowering Sustainability with AI
        </div>
        
        <h1 className="hero-title">
          Trace. Reduce. Neutralize. <br />
          <span className="gradient-text-green">EcoSmart AI</span> Guides Your Footprint.
        </h1>
        
        <p className="hero-subtitle">
          An intelligent personal companion that turns everyday activities into measurable environmental impact. 
          Log your activities, obtain direct AI recommendations, and step toward a cleaner tomorrow.
        </p>

        <div className="hero-actions">
          <button className="btn btn-lg" onClick={handleCta}>
            {token ? 'Go to Dashboard' : 'Get Started for Free'} <ArrowRight size={18} />
          </button>
          <a href="#calculator" className="btn btn-secondary btn-lg">
            Try Footprint Calculator
          </a>
        </div>

        {/* Live Interactive Calculator */}
        <div id="calculator" className="glass-card calculator-preview">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <h3 className="calculator-title">
              <Calculator size={20} color="var(--primary-color)" /> Impact Estimator
            </h3>
            <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>Quick Preview</span>
          </div>
          <p className="calculator-subtitle">
            Adjust the sliders below to estimate your current monthly carbon footprint.
          </p>

          <div className="slider-container">
            <div className="slider-header">
              <span className="slider-label"><Car size={16} color="#3b82f6" /> Daily Commute (Miles)</span>
              <span className="slider-value">{miles} miles</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={miles} 
              onChange={(e) => setMiles(Number(e.target.value))}
              className="custom-range"
            />
          </div>

          <div className="slider-container">
            <div className="slider-header">
              <span className="slider-label"><UtensilsCrossed size={16} color="#10b981" /> Meat Meals (Per Week)</span>
              <span className="slider-value">{meatMeals} meals</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="21" 
              value={meatMeals} 
              onChange={(e) => setMeatMeals(Number(e.target.value))}
              className="custom-range"
            />
          </div>

          <div className="slider-container">
            <div className="slider-header">
              <span className="slider-label"><Zap size={16} color="#f59e0b" /> Monthly Electricity (kWh)</span>
              <span className="slider-value">{electricity} kWh</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={electricity} 
              onChange={(e) => setElectricity(Number(e.target.value))}
              className="custom-range"
            />
          </div>

          <div className="calculator-result">
            <div>
              <span className="result-label">Estimated Emissions</span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span className="result-val">{totalMonthly.toFixed(0)}</span>
                <span className="result-unit">kg CO2e / month</span>
              </div>
            </div>
            <div 
              className="result-badge" 
              style={{ color: badgeColor, backgroundColor: badgeBg, border: `1px solid ${badgeColor}33` }}
            >
              {impactLevel}
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '10px', borderLeft: '3px solid var(--primary-color)', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
            {getAiSuggestion()}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="features-section">
        <h2 className="section-title">Why EcoSmart AI?</h2>
        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">
              <Leaf size={24} />
            </div>
            <h3 className="feature-card-title">Activity Logging</h3>
            <p className="feature-card-desc">
              Log transport, nutrition, and home energy categories in seconds. Watch your estimated carbon equivalents compute in real time.
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">
              <Sparkles size={24} />
            </div>
            <h3 className="feature-card-title">Smart AI Assistant</h3>
            <p className="feature-card-desc">
              Get instant feedback on your carbon breakdown. Our AI assistant analyzes trends to build actionable advice for carbon reduction.
            </p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">
              <BarChart3 size={24} />
            </div>
            <h3 className="feature-card-title">Real-Time Visualization</h3>
            <p className="feature-card-desc">
              Visualize your emissions over time using high-fidelity dynamic charts. Identify which areas are contributing the most.
            </p>
          </div>
        </div>
      </section>

      {/* Security & Approach */}
      <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
          <Shield color="var(--primary-color)" /> Secure & Efficient Platform
        </h2>
        <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
          EcoSmart AI uses Industry-Standard security guidelines like **JWT (JSON Web Tokens)** authentication and **bcrypt password hashing** to safeguard your personal data. The front end is highly optimized utilizing **React 19 & Vite** for smooth page loads and responsiveness.
        </p>
      </section>

      {/* CTA Footer Banner */}
      <section className="cta-banner">
        <h2>Start Reducing Your Footprint Today</h2>
        <p>Join eco-conscious users worldwide who are logging activities and cutting down their carbon footprint with smart recommendations.</p>
        <button className="btn btn-lg" onClick={handleCta}>
          {token ? 'Go to Dashboard' : 'Get Started Now'} <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
