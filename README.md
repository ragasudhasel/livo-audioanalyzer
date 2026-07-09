# PronounceAI 🎤

PronounceAI is an AI-powered English pronunciation assessment tool. It allows users to upload short audio clips and receive instant, actionable feedback on their pronunciation, clarity, and fluency.

## 🚀 Project Overview

The application features a modern "SaaS-style" dashboard layout while remaining completely unauthenticated for frictionless access. The system transcribes audio locally using a highly optimized whisper model, evaluates the speech metrics objectively, and utilizes an LLM to generate personalized coaching feedback.

### Key Features
- **Local Transcription**: Uses `faster-whisper` for fast, accurate speech-to-text with word-level timestamps.
- **Objective Scoring**: Scores are calculated via a deterministic heuristics engine based on actual speech metrics (confidence, WPM, pauses), not generative guesses.
- **AI Coaching**: Integrates with Google Gemini Flash to translate raw metrics into structured, human-readable feedback.
- **Privacy First**: Fully DPDP compliant. Audio is processed ephemerally and deleted immediately after analysis. No databases are used.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, TypeScript
- **Backend**: FastAPI (Python), Uvicorn
- **AI/ML**: `faster-whisper` (CTranslate2), Google Gemini (`gemini-1.5-flash`)
- **Package Management**: `npm` (Frontend), `pip` / `venv` (Backend)

## 🏗️ Architecture

![Architecture Flow](docs/architecture.md)

1. **Client** uploads audio (30-45s) via Next.js UI.
2. **FastAPI Server** receives the file and validates it.
3. **Speech Service** transcribes the audio and extracts word-level confidence and timing.
4. **Metrics Extractor** calculates speech rate and pause dynamics.
5. **Scoring Engine** evaluates overall pronunciation, clarity, and fluency.
6. **Feedback Service** securely queries Gemini to generate actionable coaching advice based on the metrics.
7. **Client** renders the comprehensive results in a dashboard view.

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# Activate venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:3000
```

Start the backend:
```bash
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the frontend:
```bash
npm run dev
```

## 🌐 Deployment

- **Frontend**: Designed to be deployed on **Vercel**. Ensure `NEXT_PUBLIC_API_URL` points to the deployed backend URL.
- **Backend**: Designed to be deployed on **Render** or any Python-compatible container service. Ensure `FRONTEND_URL` is configured for CORS.

## 🚧 Known Limitations
- **Processing Time**: Backend processing can take 5-15 seconds depending on hardware (runs on CPU by default).
- **Audio Limits**: Strictly limited to 30-45 second clips to prevent timeout errors and ensure responsive feedback.
- **Language**: Optimized exclusively for English.

## 🗺️ Future Roadmap
- **GPU Acceleration**: Deploy `faster-whisper` on GPU instances for real-time transcription.
- **User Accounts**: Implement NextAuth and a PostgreSQL database for progress tracking.
- **Streaming Audio**: Migrate from file uploads to WebSocket streaming for instant live-analysis.
