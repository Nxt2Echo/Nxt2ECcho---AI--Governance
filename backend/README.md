# Nxt2Echo Backend

A complete production-ready backend built with Express.js, TypeScript, Firebase, and Gemini AI integration.

## Architecture & Tech Stack
- **Node.js & Express.js**
- **TypeScript**
- **Firebase Authentication & Firestore & Storage**
- **Google Gemini API**
- **MVC Architecture**

## Prerequisites
- Node.js (v18+ recommended)
- Firebase Project with Firestore and Storage enabled
- Google Gemini API Key

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` and fill in your details:
   - `JWT_SECRET`: A secure random string
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_CLIENT_EMAIL`: Found in Firebase Admin SDK service account JSON
   - `FIREBASE_PRIVATE_KEY`: Found in Firebase Admin SDK service account JSON
   - `GEMINI_API_KEY`: Your Google Gemini API key

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## API Documentation
Once the server is running, you can access the Swagger UI documentation at:
`http://localhost:5000/api-docs`

## Postman Collection
Import `postman_collection.json` into Postman to test the APIs quickly.
