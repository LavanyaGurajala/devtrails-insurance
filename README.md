# 🚀 TrustShield AI: Parametric Insurance for Gig Workers

---

## 👤 Persona (Deep User Understanding)

Our primary users are **full-time Swiggy/Zomato delivery partners in tier-1 cities like Hyderabad**, who:

- Work 8–10 hours daily  
- Earn approximately ₹800–₹1200 per day  
- Depend heavily on peak-hour deliveries (lunch & dinner)  
- Experience direct income loss during disruptions  

Even a **2–3 hour disruption can reduce daily earnings by 30–40%**, making them financially vulnerable.

---

## ❗ Problem Statement

Delivery partners face **frequent income loss due to uncontrollable external events**, including:

- Heavy rainfall and flooding  
- Extreme heat conditions  
- High pollution levels  
- Curfews and restricted delivery zones  

Currently, there is **no real-time, automated income protection system**, forcing workers to bear all financial risk.

---

## 💡 Proposed Solution

**TrustShield AI** is an AI-powered parametric insurance platform that provides:

- Real-time disruption detection  
- Automated claim triggering (zero manual effort)  
- Instant payout for lost income  
- Advanced fraud prevention mechanisms  

This creates a **zero-touch, intelligent insurance system** tailored for gig workers.

---

## ⚙️ System Workflow

1. User registers (location + delivery platform)  
2. AI calculates a **risk score**  
3. Weekly premium is dynamically assigned  
4. System monitors real-time triggers (weather, AQI, etc.)  
5. Disruption detected → automatic claim initiation  
6. Fraud detection validation  
7. Instant payout via UPI (simulated)  

---

## 🧑‍🍳 Example Scenario

Ravi, a Swiggy delivery partner in Hyderabad:

- Rainfall = 70mm  
- Deliveries drop significantly  

System response:

- Detects disruption via Weather API  
- Estimates 5 hours of lost work  
- Calculates payout: ₹120 × 5 = ₹600  
- Instantly transfers compensation  

---

## 💰 Weekly Pricing Model

Premium is dynamically calculated based on:

- Location risk (flood-prone / high pollution zones)  
- Historical disruption frequency  
- Worker activity patterns  

### Example:
- Low Risk → ₹20/week  
- Medium Risk → ₹40/week  
- High Risk → ₹60/week  

### 📅 Why Weekly?
Gig workers operate on weekly income cycles. Weekly pricing ensures **affordability and adoption**.

---

## ⚡ Parametric Triggers

Claims are triggered automatically when:

- Rainfall > 50mm for 2+ hours  
- AQI > 300 for 3+ hours  
- Temperature > 45°C during peak delivery hours  
- Delivery zones marked inactive (curfews/restrictions)  

---

## 💰 Payout Logic

Payout = Average Hourly Earnings × Hours Lost  

Example:  
₹120/hour × 5 hours = ₹600  

---

## 🤖 AI/ML Architecture (Concrete Explanation)

### Inputs:
- Weather data (rainfall, temperature)  
- AQI levels  
- Location risk data  
- Delivery activity logs  

### Models Used:
- **Regression Model** → Predicts risk score & premium  
- **Anomaly Detection (Isolation Forest)** → Detects fraud patterns  

### Outputs:
- Risk score  
- Weekly premium  
- Fraud probability score  

---

## 🛡 Adversarial Defense & Anti-Spoofing Strategy

### 🚨 Handling Coordinated Fraud Attacks (Market Crash Scenario)

Our system detects **mass fraud attempts (e.g., GPS spoofing groups)** by:

- Identifying clusters of claims from the same location/time  
- Detecting identical movement patterns across multiple users  
- Flagging abnormal spikes in claims  

👉 This prevents **liquidity pool draining attacks**.

---

### 1️⃣ Differentiation: Real vs Spoofed Users

We go beyond GPS verification using:

- Movement trajectory analysis (continuous vs static)  
- Delivery activity correlation  
- Speed and route validation  
- Timeline matching with real disruptions  

---

### 2️⃣ Multi-Dimensional Data Signals

- GPS trajectory (not just a point)  
- Delivery activity logs  
- Device ID consistency  
- Weather API correlation  
- Time spent in affected zones  
- Cluster-based behavior detection  

---

### 3️⃣ AI-Based Fraud Detection

Using **Isolation Forest + rule-based hybrid system**, we detect:

- Sudden location jumps  
- High-frequency claims  
- Coordinated fraud rings  
- Unrealistic inactivity  

---

### 4️⃣ UX Balance (Fairness)

- Low risk → Instant payout  
- Medium risk → Quick verification  
- High risk → Flagged (minimal friction)  

---

### 5️⃣ Network Failure Handling

- Uses last known activity  
- Allows partial payouts  
- Prevents unfair rejection due to connectivity issues  

---

## 🎮 Gamified Trust Score (Unique Differentiator)

Each user has a **Trust Score (0–100)** based on:

- Delivery consistency  
- Claim history  
- Behavioral patterns  
- Fraud indicators  

### Score Impact:

| Score | Behavior |
|------|---------|
| 80–100 | Instant payouts |
| 50–79 | Normal processing |
| <50 | Strict validation |

### Gamification:

Users improve score by:
- Consistent delivery activity  
- Clean claim history  
- Verified behavior  

### Benefits:

- Encourages honest usage  
- Reduces fraud proactively  
- Improves system efficiency  

---

## 🏗 System Architecture

Mobile App (React)
        ↓
Backend (Spring Boot)
        ↓
External APIs (Weather, AQI)
        ↓
Python AI Service
        ↓
Risk Engine & Trigger Detection
        ↓
Fraud Detection System
        ↓
Claim Processor
        ↓
Payment Gateway (UPI Simulation)

---

## 🛠 Tech Stack

Frontend:
- React (Mobile-first UI)

Backend:
- Spring Boot (Java)

Database:
- MySQL / MongoDB

AI/ML:
- Python (Scikit-learn)

APIs:
- Weather API  
- AQI API  

Payments:
- Razorpay Test Mode / UPI Simulation  

---

## 👥 Team

Team of 5 members contributing to:

- Frontend Development  
- Backend Engineering  
- AI/ML Design  
- Integration & Testing  
- Product Strategy  

---

## 🔮 Future Scope

- Integration with Swiggy/Zomato APIs  
- Advanced ML models for predictive analytics  
- Real-time dashboards for workers and insurers  
- Multi-city and multi-platform scalability  
- Personalized insurance plans  

---

## 📌 Conclusion

TrustShield AI delivers a **scalable, AI-driven, and fraud-resilient insurance system** for gig workers.

By combining:
- Intelligent automation  
- Strong anti-fraud mechanisms  
- Gamified trust systems  

We create a **reliable financial safety net for India’s gig economy**.
