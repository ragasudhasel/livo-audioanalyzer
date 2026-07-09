from app.schemas.response import Metrics
from typing import Dict

class ScoringService:
    def compute(self, metrics: Metrics) -> Dict[str, int]:
        # 1. Average Confidence (40 pts max)
        ac = metrics.average_confidence
        if ac >= 95:
            conf_score = 40
        elif ac >= 90:
            conf_score = 35
        elif ac >= 85:
            conf_score = 30
        else:
            conf_score = max(0, int(ac * 0.3)) # Scale down
            
        # 2. Speech Rate (20 pts max)
        sr = metrics.speech_rate_wpm
        if 130 <= sr <= 170:
            rate_score = 20
        elif 100 <= sr < 130 or 170 < sr <= 190:
            rate_score = 15
        else:
            rate_score = 10
            
        # 3. Pauses & Fillers (25 pts max)
        # Assuming ideal is very few pauses
        pause_penalty = min(15, metrics.pause_count * 2)
        long_pause_penalty = min(10, metrics.long_pauses * 5)
        pause_score = max(0, 25 - pause_penalty - long_pause_penalty)
        
        # 4. Recognition Reliability (15 pts max)
        # Proxy for transcript quality: how many low confidence words there were
        # In a real scenario, this involves more complex checks
        rel_score = 15
        if ac < 80:
            rel_score -= 10
        elif ac < 90:
            rel_score -= 5
            
        overall_score = conf_score + rate_score + pause_score + rel_score
        
        # Determine sub-scores
        pronunciation = min(100, int((conf_score / 40) * 100))
        clarity = min(100, int(((conf_score + rel_score) / 55) * 100))
        fluency = min(100, int(((rate_score + pause_score) / 45) * 100))
        
        return {
            "overall_score": overall_score,
            "pronunciation": pronunciation,
            "clarity": clarity,
            "fluency": fluency
        }
