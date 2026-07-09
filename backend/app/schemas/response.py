from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ProcessMetadata(BaseModel):
    processing_time_ms: int
    language: str
    duration_seconds: float
    model: str

class Metrics(BaseModel):
    average_confidence: float
    speech_rate_wpm: float
    pause_count: int
    long_pauses: int
    speaking_duration_seconds: float

class HighlightedWord(BaseModel):
    word: str
    status: str
    confidence: float

class FeedbackResponse(BaseModel):
    overall_score: int
    pronunciation: int
    clarity: int
    fluency: int
    metrics: Metrics
    mistakes: List[HighlightedWord]
    transcript: str
    feedback: str
    metadata: ProcessMetadata
