# AI WeatherWise 🌦️🤖

> **Deliver intelligent weather forecasts, real-time climate metrics, and AI-driven personalized insights.**

[![Node.js Version](https://img.shields.io/badge/node.js-v16%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-brightgreen.svg)](https://www.mongodb.com/)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 Project Overview
**AI WeatherWise** is a robust RESTful backend platform built with **Node.js, Express.js, MongoDB (Mongoose ODM)**, and integrated with **Google Gemini AI** (`@google/genai`) and **OpenWeatherMap API**. 

The system delivers real-time weather metrics, smart daily summaries, and personalized activity & clothing recommendations based on environmental conditions. It features **JWT authentication, bcrypt password hashing, favorite location management, resilient offline mock fallbacks**, and centralized error handling.

* **Team ID:** `SWTID-2026-5400`
* **Team Size:** 3 Members
* **Team Leader:** Tamil Mathi.v
* **Team Members:** Rithika P, Hemavathi G
* **Project Name:** AI WEATHER WISE
* **SkillWallet Portal:** https://myskillwallet.ai/login
* **GitHub Repository:** https://github.com/tamilmathiv60-ui/ai-weather-wise
* **Evaluation / Submission Date:** 30 September 2026

---

## 🏛️ System Architecture

The application implements an **MVC Pattern** with a dedicated **Service Layer**:

```
[ Client / Postman ]
       │
       ▼ (HTTP/REST)
[ Express Gateway / CORS / Body Parser ]
       │
       ▼
[ JWT Authentication Middleware ]
       │
   ┌───┴───────────────────────────────┐
   ▼                                   ▼
[ Controllers Layer ]          [ Controllers Layer ]
(Auth, Locations)              (Weather, AI Insights)
   │                                   │
   ▼                                   ▼
[ Models / Mongoose ]          [ External Services ]
(Users, Locations Collections) ├── OpenWeatherMap API (with Fallback)
   │                           └── Google Gemini AI (@google/genai)
   ▼
[ MongoDB Database ]
```

---

## 🚀 Features
- 🔐 **Authentication & Security:** User registration, bcrypt password hashing, JWT Bearer tokens, role-based guarding (`reader`, `admin`).
- 📍 **Favorite Locations CRUD:** Save, retrieve, and delete favorite cities linked to user profiles.
- 🌤️ **Real-time Weather Telemetry:** Live temperature, humidity, wind speed, and atmospheric conditions via OpenWeatherMap.
- 🛡️ **Resilient Fallback Mode:** Automatic simulated weather generator ensures 100% uptime even without external API keys.
- 🧠 **Google Gemini AI Insights:** Natural language summaries and personalized clothing/outdoor activity recommendations.
- 🧪 **API Testing Ready:** Pre-configured `postman_collection.json` test runner.

---

## 📂 Project Directory Structure

```text
ai-weatherwise/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── aiController.js       # Gemini AI recommendation logic
│   │   ├── authController.js     # User registration and JWT login
│   │   ├── locationController.js # Favorite locations CRUD logic
│   │   └── weatherController.js  # Weather ingestion handler
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT route protection guard
│   ├── models/
│   │   ├── Location.js           # Mongoose Location schema
│   │   └── User.js               # Mongoose User schema
│   ├── routes/
│   │   ├── aiRoutes.js           # /api/ai endpoints
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── locationRoutes.js     # /api/locations endpoints
│   │   └── weatherRoutes.js      # /api/weather endpoints
│   ├── services/
│   │   ├── ai.service.js         # Google Gemini AI SDK client
│   │   └── weather.service.js    # OpenWeatherMap fetcher & fallback
│   └── app.js                    # Express app setup and middleware
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git exclusion rules
├── index.js                      # Application server entry point
├── package.json                  # Dependencies and scripts
├── postman_collection.json       # Automated Postman collection
└── README.md                     # Documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
* **Node.js** (v16 or higher)
* **MongoDB** installed locally (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

### 1. Clone the Repository
```bash
git clone https://github.com/[YOUR-USERNAME]/ai-weather-wise.git
cd ai-weather-wise
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root folder (copy from `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/weatherwise
JWT_SECRET=ai_weatherwise_jwt_secret_key_2026
GEMINI_API_KEY=your_gemini_api_key_here
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```
*(Note: If you don't have Gemini or OpenWeatherMap API keys right now, the application will automatically run in **resilient fallback mode** without errors!)*

### 4. Run the Server
```bash
# For development with auto-reload:
npm run dev

# For production:
npm start
```
The server will start at: `http://localhost:5000`

---

## 📡 API Endpoints Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Server health check and team metadata |
| `POST`| `/api/auth/register` | Public | Register new user account |
| `POST`| `/api/auth/login` | Public | Authenticate user and receive JWT token |
| `GET` | `/api/weather/:city` | Public | Retrieve live weather metrics for a city |
| `POST`| `/api/ai/recommendation` | Public | Get Gemini AI weather summaries & advice |
| `POST`| `/api/locations` | Private (JWT) | Save a favorite city to user profile |
| `GET` | `/api/locations` | Private (JWT) | Fetch all saved favorite cities for user |
| `DELETE`| `/api/locations/:id` | Private (JWT) | Remove a saved city by ID |

---

## 🧪 Postman API Testing Demo

1. Open **Postman**.
2. Click **Import** and select `postman_collection.json`.
3. Run the collection to test all endpoints.

Sample response for `GET /api/weather/bangalore`:
```json
{
  "success": true,
  "data": {
    "city": "bangalore",
    "temperature": 24,
    "humidity": 70,
    "windSpeed": 12,
    "condition": "cloudy",
    "isMock": true
  }
}
```

Sample response for `POST /api/ai/recommendation`:
```json
{
  "success": true,
  "recommendation": "Stay hydrated, and wear light cotton clothes."
}
```

---

## 👥 Team Information
* **Team ID:** `SWTID-2026-5400`
* **Team Size:** 3 Members
* **Team Leader:** Tamil Mathi.v
* **Team Members:** Rithika P, Hemavathi G
* **Project Name:** AI WEATHER WISE
* **SkillWallet Portal:** https://myskillwallet.ai/login
* **GitHub Repository:** https://github.com/tamilmathiv60-ui/ai-weather-wise
* **Date:** 30 September 2026
