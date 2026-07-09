from app.schemas.response import Metrics

class MetricsService:
    def extract(self, speech_result: dict) -> Metrics:
        words = speech_result.get("words", [])
        duration = speech_result.get("duration", 0.0)
        
        if not words or duration == 0:
            return Metrics(
                average_confidence=0.0,
                speech_rate_wpm=0.0,
                pause_count=0,
                long_pauses=0,
                speaking_duration_seconds=duration
            )

        total_confidence = sum(w.get("probability", 0) for w in words)
        avg_confidence = (total_confidence / len(words)) * 100
        
        # Word count per minute
        speech_rate = (len(words) / duration) * 60
        
        pause_count = 0
        long_pauses = 0
        
        # Calculate pauses
        for i in range(1, len(words)):
            pause_duration = words[i]["start"] - words[i-1]["end"]
            if pause_duration > 0.3:
                pause_count += 1
            if pause_duration > 1.0:
                long_pauses += 1

        return Metrics(
            average_confidence=avg_confidence,
            speech_rate_wpm=speech_rate,
            pause_count=pause_count,
            long_pauses=long_pauses,
            speaking_duration_seconds=duration
        )
