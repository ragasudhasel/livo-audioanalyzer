# PronounceAI Architecture

This document provides a high-level overview of the PronounceAI architecture, detailing the request lifecycle, the AI pipeline, and key design decisions.

## High-Level Architecture

The system follows a modern decoupled architecture:
- **Frontend**: Next.js (React) application deployed on Vercel. Handles user interface, audio capture, and state management.
- **Backend**: FastAPI (Python) service deployed on Render (or similar container platform). Handles audio processing, speech-to-text, scoring, and AI feedback generation.

## Request Lifecycle

1. **Audio Capture**: The user records or uploads an audio file (30-45s) via the Next.js frontend.
2. **Pre-flight Validation**: The frontend ensures the file is an audio type and within reasonable file size limits.
3. **API Submission**: The frontend POSTs the audio file to the `/api/upload` endpoint on the FastAPI backend.
4. **Backend Validation**: The `Validator` service checks audio duration and format.
5. **Transcription**: The audio is passed to `faster-whisper` for speech-to-text conversion and word-level timestamp/confidence extraction.
6. **Metrics Extraction**: The `Metrics Extractor` calculates speech rate, pause counts, and averages confidence scores.
7. **Scoring Engine**: The `Scoring Engine` computes the Overall, Pronunciation, Clarity, and Fluency scores based on the extracted metrics.
8. **Feedback Generation**: The transcript and metrics are sent to Google Gemini (via `gemini-1.5-flash`) to generate structured, actionable coaching feedback.
9. **Response**: The aggregated data is returned to the frontend and displayed in the Dashboard.

## Backend Folder Structure

```
backend/
├── app/
│   ├── api/          # FastAPI route handlers
│   ├── core/         # Configuration and environment variables
│   ├── models/       # Database models (if applicable)
│   ├── schemas/      # Pydantic schemas for request/response validation
│   └── services/     # Core business logic
│       ├── validation/
│       ├── speech/   # faster-whisper integration
│       ├── metrics/
│       ├── scoring/
│       └── feedback/ # Gemini integration
├── docs/             # Documentation
├── main.py           # FastAPI application entry point
├── requirements.txt  # Python dependencies
└── .env              # Environment variables
```

## The AI Pipeline

The pipeline is intentionally divided into deterministic and generative stages:

1. **Deterministic Transcription (faster-whisper)**: 
   Provides exact timestamps and statistical probability scores for every word spoken.
2. **Rule-Based Scoring**: 
   Scores are calculated using strict mathematical heuristics (e.g., words per minute, pause ratios) rather than relying on an LLM to "guess" a score. This ensures consistency.
3. **Generative Coaching (Gemini)**: 
   The LLM is strictly used for its natural language generation capabilities to interpret the hard metrics and provide a human-like coaching summary.

## Key Technology Decisions

### Why faster-whisper?
- **Performance**: `faster-whisper` uses CTranslate2, which is significantly faster and uses less memory than the original OpenAI Whisper implementation.
- **Word-Level Timestamps**: It reliably provides the start/end times and confidence probabilities for individual words, which is essential for highlighting mispronunciations.
- **Local Processing**: Keeps the audio processing within our infrastructure for strict DPDP compliance (no third-party audio sharing).

### Why Gemini 1.5 Flash?
- **Speed & Cost**: It is exceptionally fast and cost-effective for simple summarization and feedback generation tasks.
- **Context Window**: Easily handles the transcript and metrics context without hitting limits.

## Scoring Methodology

The overall score is a weighted average of several objective metrics:
- **Recognition Confidence (40%)**: The average probability score from Whisper. High confidence means clear, native-like pronunciation.
- **Speech Rate (20%)**: Words per minute. Penalizes exceptionally slow or fast speech.
- **Pause Analysis (15%)**: Total number of pauses.
- **Long Pause Detection (10%)**: Heavily penalizes unnatural gaps in speech.
- **Fillers (10%)**: Deductions for excessive "um" or "uh" sounds (if captured).
- **Transcript Quality (5%)**: General coherence of the transcribed text.

*Note: This is an educational indicator, not a clinical assessment.*

## Trade-offs and Limitations

- **CPU Processing**: The current implementation runs `faster-whisper` on CPU (INT8). While highly optimized, it is slower than GPU processing. Deploying with GPU support would decrease latency significantly.
- **Audio Length Limits**: Hardcoded to 30-45 seconds to ensure quick turnaround times and prevent timeout errors on standard HTTP requests.
- **Language**: Currently optimized and evaluated strictly for English.

## Future Improvements

1. **WebSocket Integration**: Stream audio directly to the backend for real-time transcription and lower perceived latency.
2. **GPU Deployment**: Move the backend to a GPU-enabled instance (e.g., AWS EC2 G4 or RunPod) for near-instant processing.
3. **User Accounts & History**: Implement NextAuth and a database (PostgreSQL) to allow users to track their progress over time.
4. **Phoneme-Level Analysis**: Upgrade from word-level confidence to true phoneme-level acoustic modeling for pinpoint pronunciation feedback.
