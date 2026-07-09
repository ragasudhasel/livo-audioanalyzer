from faster_whisper import WhisperModel

class SpeechService:
    def __init__(self):
        # Initialize the model on CPU for universal compatibility.
        # In a real deployed environment with a GPU, you would use device="cuda".
        self.model = WhisperModel("base", device="cpu", compute_type="int8")

    async def process(self, file_path: str) -> dict:
        # Transcribe audio using faster-whisper
        segments_gen, info = self.model.transcribe(file_path, word_timestamps=True)
        
        language = info.language
        words = []
        full_transcript = []
        
        for segment in segments_gen:
            full_transcript.append(segment.text.strip())
            for word in segment.words:
                words.append({
                    "word": word.word.strip(),
                    "start": word.start,
                    "end": word.end,
                    "probability": word.probability
                })
                
        return {
            "language": language,
            "transcript": " ".join(full_transcript),
            "words": words,
            "duration": info.duration,
            "mistakes": [
                {
                    "word": w["word"], 
                    "status": "normal" if w["probability"] >= 0.85 else ("warning" if w["probability"] >= 0.70 else "flagged"), 
                    "confidence": w["probability"]
                } 
                for w in words
            ]
        }
