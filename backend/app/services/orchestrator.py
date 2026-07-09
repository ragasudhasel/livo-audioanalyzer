import os
import uuid
import time
from fastapi import UploadFile, HTTPException
from app.schemas.response import FeedbackResponse, ProcessMetadata
from app.services.validation.validator import validate_audio_file
from app.services.speech.transcriber import SpeechService
from app.services.metrics.extractor import MetricsService
from app.services.scoring.engine import ScoringService
from app.services.feedback.generator import FeedbackService

TEMP_DIR = "temp"

class AnalysisOrchestrator:
    def __init__(self):
        # We initialize these services once to load the ML models into memory 
        # and prevent loading them on every request.
        self.speech_service = SpeechService()
        self.metrics_service = MetricsService()
        self.scoring_service = ScoringService()
        self.feedback_service = FeedbackService()
        os.makedirs(TEMP_DIR, exist_ok=True)

    async def process_audio(self, file: UploadFile) -> FeedbackResponse:
        start_time = time.time()
        file_extension = file.filename.split('.')[-1]
        temp_file_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}.{file_extension}")
        
        try:
            # 1. Save to temp storage
            with open(temp_file_path, "wb") as buffer:
                buffer.write(await file.read())
            
            # 2. File Validation
            validate_audio_file(temp_file_path)
            
            # 3. Speech Service (Transcribe & Detect Lang)
            speech_result = await self.speech_service.process(temp_file_path)
            if speech_result.get("language") != "en":
                raise HTTPException(status_code=400, detail="Non-English audio detected. Please upload English audio.")
                
            # 4. Metrics Service
            metrics = self.metrics_service.extract(speech_result)
            
            # 5. Scoring Service
            scores = self.scoring_service.compute(metrics)
            
            # 6. Feedback Service
            feedback_result = await self.feedback_service.generate(
                transcript=speech_result["transcript"], 
                metrics=metrics, 
                scores=scores
            )
            
            processing_time_ms = int((time.time() - start_time) * 1000)
            
            return FeedbackResponse(
                overall_score=scores["overall_score"],
                pronunciation=scores["pronunciation"],
                clarity=scores["clarity"],
                fluency=scores["fluency"],
                metrics=metrics,
                mistakes=speech_result.get("mistakes", []),
                transcript=speech_result["transcript"],
                feedback=feedback_result,
                metadata=ProcessMetadata(
                    processing_time_ms=processing_time_ms,
                    language=speech_result["language"],
                    duration_seconds=speech_result.get("duration", 0.0),
                    model="faster-whisper-tiny.en"
                )
            )
            
        except Exception as e:
            if not isinstance(e, HTTPException):
                raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
            raise e
        finally:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)

# Singleton instance
orchestrator = AnalysisOrchestrator()
