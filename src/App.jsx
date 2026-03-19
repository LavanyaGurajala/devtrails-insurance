import { useState, useEffect } from 'react';
import './App.css';

// Simulated data
const LOCATIONS = [
  { id: 1, name: 'Hyderabad - Gachibowli', risk: 'high' },
  { id: 2, name: 'Hyderabad - Banjara Hills', risk: 'medium' },
  { id: 3, name: 'Hyderabad - Secunderabad', risk: 'low' },
  { id: 4, name: 'Bangalore - Koramangala', risk: 'high' },
  { id: 5, name: 'Mumbai - Andheri', risk: 'medium' },
];

const PLATFORMS = ['Swiggy', 'Zomato', 'Dunzo', 'BigBasket'];

const RISK_SCORE_MAP = { low: 25, medium: 55, high: 85 };

// Premium calculation based on trust score
const calculatePremium = (trustScore, riskLevel) => {
  const basePremium = { low: 30, medium: 50, high: 70 };
  const base = basePremium[riskLevel];
  // Higher trust score = lower premium (up to 40% discount)
  const discount = (trustScore / 100) * 0.4;
  return Math.round(base * (1 - discount));
};

export default function App() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    name: '',
    phone: '',
    location: null,
    platform: '',
    upiId: '',
  });
  const [riskData, setRiskData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [weatherData, setWeatherData] = useState({ rainfall: 20, aqi: 150, temp: 32 });
  const [disruption, setDisruption] = useState(null);
  const [claim, setClaim] = useState(null);
  const [trustScore, setTrustScore] = useState(null);
  const [isExtractingTrust, setIsExtractingTrust] = useState(false);
  const [trustProgress, setTrustProgress] = useState(0);
  const [payoutComplete, setPayoutComplete] = useState(false);

  const trustTier = trustScore >= 80 ? 'excellent' : trustScore >= 60 ? 'good' : 'fair';

  // Simulate weather changes
  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        rainfall: Math.min(100, prev.rainfall + Math.random() * 15),
        aqi: Math.min(400, prev.aqi + Math.random() * 30),
        temp: prev.temp + (Math.random() - 0.5) * 2,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Check for disruption triggers
  useEffect(() => {
    if (!isMonitoring) return;
    
    if (weatherData.rainfall > 50 && !disruption) {
      setDisruption({
        type: 'Heavy Rainfall',
        value: `${weatherData.rainfall.toFixed(0)}mm`,
        hoursLost: 5,
        hourlyRate: 120,
      });
      setIsMonitoring(false);
    } else if (weatherData.aqi > 300 && !disruption) {
      setDisruption({
        type: 'High Pollution',
        value: `AQI ${weatherData.aqi.toFixed(0)}`,
        hoursLost: 4,
        hourlyRate: 120,
      });
      setIsMonitoring(false);
    }
  }, [weatherData, isMonitoring, disruption]);

  // Move to claim details as soon as a disruption is detected.
  useEffect(() => {
    if (step === 5 && disruption) {
      setStep(6);
    }
  }, [step, disruption]);

  // Extract trust score after registration
  const extractTrustScore = () => {
    setIsExtractingTrust(true);
    setTrustProgress(0);
    
    // Simulate progressive trust score extraction
    const progressInterval = setInterval(() => {
      setTrustProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // After 3 seconds, reveal the trust score
    setTimeout(() => {
      clearInterval(progressInterval);
      setTrustProgress(100);
      // Keep demo deterministic so trust factors and messaging stay consistent.
      setTrustScore(80);
      setIsExtractingTrust(false);
      setStep(2);
    }, 3000);
  };

  const calculateRisk = () => {
    const location = LOCATIONS.find(l => l.id === user.location);
    const riskLevel = location?.risk || 'medium';
    const premium = calculatePremium(trustScore, riskLevel);
    
    setRiskData({
      level: riskLevel,
      score: RISK_SCORE_MAP[riskLevel],
      premium: premium,
    });
    setStep(4);
  };

  const processClaim = () => {
    setClaim({
      id: `CLM${Date.now()}`,
      amount: disruption.hoursLost * disruption.hourlyRate,
      status: 'processing',
    });
    setStep(7);

    // Simulate fraud check and payout
    setTimeout(() => {
      setClaim(prev => ({ ...prev, status: 'verified' }));
      setTimeout(() => {
        setClaim(prev => ({ ...prev, status: 'paid' }));
        setPayoutComplete(true);
      }, 2000);
    }, 2000);
  };

  const resetDemo = () => {
    setStep(1);
    setUser({ name: '', phone: '', location: null, platform: '', upiId: '' });
    setRiskData(null);
    setIsMonitoring(false);
    setWeatherData({ rainfall: 20, aqi: 150, temp: 32 });
    setDisruption(null);
    setClaim(null);
    setTrustScore(null);
    setIsExtractingTrust(false);
    setTrustProgress(0);
    setPayoutComplete(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">TrustShield AI</span>
        </div>
        {trustScore && (
          <div className="trust-badge">
            Trust Score: <span className="score">{trustScore}</span>
          </div>
        )}
      </header>

      <main className="main">
        {/* Step Indicator */}
        <div className="steps">
          {['Register', 'Trust', 'Risk', 'Premium', 'Monitor', 'Claim', 'Payout'].map((s, i) => (
            <div key={s} className={`step ${step >= i + 1 ? 'active' : ''}`}>
              <div className="step-dot">{i + 1}</div>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Registration */}
        {step === 1 && !isExtractingTrust && (
          <div className="card fade-in">
            <h2>Register as Delivery Partner</h2>
            <p className="subtitle">Get instant income protection</p>
            
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={user.phone}
                onChange={e => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Delivery Location</label>
              <select
                value={user.location || ''}
                onChange={e => setUser({ ...user, location: Number(e.target.value) })}
              >
                <option value="">Select location</option>
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Delivery Platform</label>
              <div className="platform-grid">
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    className={`platform-btn ${user.platform === p ? 'selected' : ''}`}
                    onClick={() => setUser({ ...user, platform: p })}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>UPI ID (for payouts)</label>
              <input
                type="text"
                placeholder="yourname@upi"
                value={user.upiId}
                onChange={e => setUser({ ...user, upiId: e.target.value })}
              />
            </div>

            <button
              className="btn-primary"
              disabled={!user.name || !user.location || !user.platform}
              onClick={extractTrustScore}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1.5: Trust Score Extraction (shows during loading) */}
        {isExtractingTrust && (
          <div className="card fade-in">
            <h2>Extracting Trust Score</h2>
            <p className="subtitle">Analyzing your delivery history...</p>
            
            <div className="trust-extraction">
              <div className="extraction-spinner"></div>
              <div className="extraction-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(trustProgress, 100)}%` }}></div>
                </div>
                <span className="progress-text">{Math.min(Math.round(trustProgress), 100)}%</span>
              </div>
              
              <div className="extraction-steps">
                <div className={`extraction-item ${trustProgress > 20 ? 'done' : ''}`}>
                  <span className="extraction-icon">📱</span>
                  <span>Connecting to {user.platform} API...</span>
                </div>
                <div className={`extraction-item ${trustProgress > 40 ? 'done' : ''}`}>
                  <span className="extraction-icon">📊</span>
                  <span>Fetching delivery history...</span>
                </div>
                <div className={`extraction-item ${trustProgress > 60 ? 'done' : ''}`}>
                  <span className="extraction-icon">⭐</span>
                  <span>Analyzing ratings & reviews...</span>
                </div>
                <div className={`extraction-item ${trustProgress > 80 ? 'done' : ''}`}>
                  <span className="extraction-icon">🔒</span>
                  <span>Verifying identity...</span>
                </div>
                <div className={`extraction-item ${trustProgress >= 100 ? 'done' : ''}`}>
                  <span className="extraction-icon">✅</span>
                  <span>Calculating trust score...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Trust Score Revealed */}
        {step === 2 && !isExtractingTrust && (
          <div className="card fade-in">
            <h2>Trust Score Verified</h2>
            <p className="subtitle">Based on your {user.platform} delivery history</p>
            
            <div className="trust-score-display">
              <div className={`trust-circle ${trustScore >= 80 ? 'excellent' : trustScore >= 60 ? 'good' : 'fair'}`}>
                <span className="trust-value">{trustScore}</span>
                <span className="trust-label">Trust Score</span>
              </div>
              <div className={`trust-level ${trustTier}`}>
                {trustTier.toUpperCase()} TRUST
              </div>
              <p className="trust-description">
                {trustScore >= 80 
                  ? 'You qualify for our best premium rates!' 
                  : trustScore >= 60 
                  ? 'Good standing - competitive rates available'
                  : 'Build trust for better rates over time'}
              </p>
            </div>

            <div className="trust-factors">
              <h4>Trust Factors Analyzed</h4>
              <div className="factor-item">
                <span>Delivery Completion Rate</span>
                <span className="factor-value">93%</span>
              </div>
              <div className="factor-item">
                <span>Customer Ratings</span>
                <span className="factor-value">4.6 / 5.0</span>
              </div>
              <div className="factor-item">
                <span>Active Days</span>
                <span className="factor-value">210 days</span>
              </div>
              <div className="factor-item">
                <span>Fraud Flags</span>
                <span className="factor-value success">None</span>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setStep(3)}>
              Continue to Risk Analysis
            </button>
          </div>
        )}

        {/* Step 3: Risk Calculation */}
        {step === 3 && (
          <div className="card fade-in">
            <h2>Calculating Your Risk Profile</h2>
            <p className="subtitle">AI analyzes location & historical data</p>
            
            <div className="analysis-box">
              <div className="analysis-item">
                <span className="analysis-icon">📍</span>
                <div>
                  <strong>Location Analysis</strong>
                  <p>{LOCATIONS.find(l => l.id === user.location)?.name}</p>
                </div>
                <span className="check">✓</span>
              </div>
              <div className="analysis-item">
                <span className="analysis-icon">🌧️</span>
                <div>
                  <strong>Weather Patterns</strong>
                  <p>Historical rainfall data</p>
                </div>
                <span className="check">✓</span>
              </div>
              <div className="analysis-item">
                <span className="analysis-icon">💨</span>
                <div>
                  <strong>Air Quality Index</strong>
                  <p>Pollution trends</p>
                </div>
                <span className="check">✓</span>
              </div>
              <div className="analysis-item">
                <span className="analysis-icon">📊</span>
                <div>
                  <strong>Disruption History</strong>
                  <p>Past incidents in area</p>
                </div>
                <span className="check">✓</span>
              </div>
            </div>

            <button className="btn-primary" onClick={calculateRisk}>
              Calculate Premium
            </button>
          </div>
        )}

        {/* Step 4: Premium Display */}
        {step === 4 && riskData && (
          <div className="card fade-in">
            <h2>Your Insurance Plan</h2>
            <p className="subtitle">Personalized based on your risk profile</p>

            <div className="risk-display">
              <div className={`risk-circle ${riskData.level}`}>
                <span className="risk-score">{riskData.score}</span>
                <span className="risk-label">Risk Score</span>
              </div>
              <div className="risk-level">
                {riskData.level.toUpperCase()} RISK
              </div>
            </div>

            <div className="premium-card">
              <div className="premium-header">Weekly Premium</div>
              <div className="premium-amount">₹{riskData.premium}<span>/week</span></div>
              <div className="trust-discount">
                Trust Score Discount: {Math.round((trustScore / 100) * 40)}% off
              </div>
              <div className="premium-features">
                <div>Rainfall Protection</div>
                <div>AQI Protection</div>
                <div>Heat Wave Protection</div>
                <div>Instant UPI Payouts</div>
              </div>
            </div>

            <div className="coverage-info">
              <div className="coverage-item">
                <span>Payout Rate</span>
                <strong>₹120/hour</strong>
              </div>
              <div className="coverage-item">
                <span>Max Daily</span>
                <strong>₹1,200</strong>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setStep(5)}>
              Subscribe Now
            </button>
          </div>
        )}

        {/* Step 5: Monitoring Dashboard */}
        {step === 5 && (
          <div className="card fade-in">
            <h2>Live Monitoring</h2>
            <p className="subtitle">Real-time disruption detection</p>

            <div className="user-info-bar">
              <span>👤 {user.name}</span>
              <span>🛵 {user.platform}</span>
            </div>

            <div className="weather-grid">
              <div className={`weather-card ${weatherData.rainfall > 50 ? 'danger' : ''}`}>
                <span className="weather-icon">🌧️</span>
                <div className="weather-value">{weatherData.rainfall.toFixed(0)}mm</div>
                <div className="weather-label">Rainfall</div>
                <div className="weather-threshold">Trigger: &gt;50mm</div>
              </div>
              <div className={`weather-card ${weatherData.aqi > 300 ? 'danger' : ''}`}>
                <span className="weather-icon">💨</span>
                <div className="weather-value">{weatherData.aqi.toFixed(0)}</div>
                <div className="weather-label">AQI</div>
                <div className="weather-threshold">Trigger: &gt;300</div>
              </div>
              <div className={`weather-card ${weatherData.temp > 45 ? 'danger' : ''}`}>
                <span className="weather-icon">🌡️</span>
                <div className="weather-value">{weatherData.temp.toFixed(1)}°C</div>
                <div className="weather-label">Temperature</div>
                <div className="weather-threshold">Trigger: &gt;45°C</div>
              </div>
            </div>

            <div className={`status-bar ${isMonitoring ? 'active' : ''}`}>
              <span className="pulse"></span>
              {isMonitoring ? 'Monitoring Active...' : 'Click to Start Monitoring'}
            </div>

            {!disruption ? (
              <button
                className="btn-primary"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? 'Stop Simulation' : 'Start Weather Simulation'}
              </button>
            ) : (
              <button className="btn-danger" onClick={() => setStep(6)}>
                Disruption Detected - View Details
              </button>
            )}
          </div>
        )}

        {/* Step 6: Claim Triggered */}
        {step === 6 && disruption && (
          <div className="card fade-in">
            <div className="alert-banner">
              ⚠️ AUTOMATIC CLAIM TRIGGERED
            </div>
            
            <h2>Disruption Detected</h2>
            <p className="subtitle">Zero manual effort required</p>

            <div className="disruption-details">
              <div className="disruption-type">{disruption.type}</div>
              <div className="disruption-value">{disruption.value}</div>
            </div>

            <div className="claim-calculation">
              <div className="calc-row">
                <span>Hours Lost (Estimated)</span>
                <span>{disruption.hoursLost} hours</span>
              </div>
              <div className="calc-row">
                <span>Hourly Rate</span>
                <span>₹{disruption.hourlyRate}</span>
              </div>
              <div className="calc-row total">
                <span>Total Payout</span>
                <span>₹{disruption.hoursLost * disruption.hourlyRate}</span>
              </div>
            </div>

            <div className="fraud-check">
              <span className="check-icon">🔒</span>
              <div>
                <strong>Fraud Check Passed</strong>
                <p>GPS verified • Activity confirmed • Trust Score: {trustScore}</p>
              </div>
            </div>

            <button className="btn-primary" onClick={processClaim}>
              Process Instant Payout
            </button>
          </div>
        )}

        {/* Step 7: Payout */}
        {step === 7 && claim && (
          <div className="card fade-in">
            <h2>Processing Payout</h2>
            <p className="subtitle">Claim ID: {claim.id}</p>

            <div className="payout-progress">
              <div className={`progress-step ${claim.status ? 'done' : ''}`}>
                <div className="progress-icon">📋</div>
                <span>Claim Created</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${claim.status === 'verified' || claim.status === 'paid' ? 'done' : ''}`}>
                <div className="progress-icon">🔍</div>
                <span>Fraud Verification</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${claim.status === 'paid' ? 'done' : ''}`}>
                <div className="progress-icon">💰</div>
                <span>UPI Transfer</span>
              </div>
            </div>

            {payoutComplete && (
              <div className="success-box fade-in">
                <div className="success-icon">✅</div>
                <h3>Payout Complete!</h3>
                <div className="payout-amount">₹{claim.amount}</div>
                <p>Transferred to {user.upiId || 'your UPI'}</p>
              </div>
            )}

            {payoutComplete && (
              <button className="btn-secondary" onClick={resetDemo}>
                Restart Demo
              </button>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>TrustShield AI - Parametric Insurance for Gig Workers</p>
        <p className="demo-note">⚡ Prototype Demo</p>
      </footer>
    </div>
  );
}
