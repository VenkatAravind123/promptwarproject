# Carbon Footprint Tracker & Smart Assistant

## Challenge Vertical
**Sustainability / Personal Lifestyle**

## Overview
This application helps individuals track their daily carbon footprint (e.g., transportation, diet, energy usage) and features an integrated **Smart AI Assistant** that analyzes this data to provide contextual, personalized recommendations for reducing emissions.

## Approach and Logic
- **Data Logging:** Users can log their daily activities. Each activity translates to an estimated carbon equivalent (CO2e).
- **Smart Assistant Logic:** The AI Assistant aggregates user data and uses rules/heuristics to generate actionable insights. For example, if a user's transport emissions are high, it recommends carpooling, public transit, or cycling. 
- **Security & Efficiency:** We use JWT authentication, password hashing (`bcrypt`), and optimized Mongoose models. The frontend is built with React/Vite for performance.

## Setup Instructions

### Backend
1. `cd backend`
2. Configure `.env` with `MONGO_URI` and `JWT_SECRET`
3. `npm start` (or `node server.js`)

### Frontend
1. `cd frontend/carbonfootprintapp`
2. `npm install`
3. `npm run dev`

## Assumptions
- Standard emission factors are used for generic calculations (e.g., 0.4 kg CO2e per mile driven).
- The user inputs accurate data regarding their lifestyle.
- The Smart Assistant provides rule-based dynamic recommendations based on thresholds, simulating an AI model's context-awareness.

## Evaluation Focus Areas Addressed
- **Code Quality:** Modular MERN structure with clean architecture.
- **Security:** JWT and password hashing implementation.
- **Efficiency:** Fast Vite build and optimized React hooks.
- **Testing:** Basic logic validation setup.
- **Accessibility:** UI built with a11y standards (keyboard navigation, ARIA tags).
