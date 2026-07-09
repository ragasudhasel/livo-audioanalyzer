import google.generativeai as genai
from app.core.config import settings
from app.schemas.response import Metrics

class FeedbackService:
    def __init__(self):
        # Configure Gemini API
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def generate(self, transcript: str, metrics: Metrics, scores: dict) -> str:
        if not self.model:
            return "Excellent attempt! To improve, try focusing on the clarity of individual words and maintain a steady pace."
            
        prompt = f"""
You are an English pronunciation coach.
Based on the transcript and metrics provided below:
Explain pronunciation mistakes. Explain why they happened. Suggest improvements.
Do not invent words. Keep a friendly tone.
Structure your feedback exactly like this, using bullet points:
✅ Strengths
- [strength 1]
- [strength 2]

⚠ Needs Improvement
- [area for improvement]
- [area for improvement]

💡 Practice Tip
Repeat:
[specific word breakdown like pro-nun-ci-A-tion]

Maximum 120 words.

Transcript: "{transcript}"
Average Confidence: {metrics.average_confidence:.1f}%
Speech Rate: {metrics.speech_rate_wpm:.1f} WPM
Overall Score: {scores['overall_score']}/100
"""
        try:
            # Using generate_content instead of generate_content_async for simplicity if async isn't available,
            # but ideally use the async version for FastAPI.
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            # Fallback behavior
            return "Good job! Try to speak a bit clearer on difficult words and maintain a steady pace. Keep practicing!"
