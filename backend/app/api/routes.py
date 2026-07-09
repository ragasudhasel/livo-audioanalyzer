from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.services.orchestrator import orchestrator
from app.schemas.response import FeedbackResponse

router = APIRouter()

@router.post("/upload", response_model=FeedbackResponse)
async def upload_audio(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    try:
        result = await orchestrator.process_audio(file)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
