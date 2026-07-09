import os
from fastapi import HTTPException
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
from mutagen.mp4 import MP4
import mutagen

ALLOWED_EXTENSIONS = {'mp3', 'wav', 'm4a', 'aac', 'ogg'}
MAX_FILE_SIZE_MB = 10
MIN_DURATION_SEC = 30
MAX_DURATION_SEC = 45

def validate_audio_file(file_path: str):
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    if file_size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB allowed.")

    ext = file_path.split('.')[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported file format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")

    try:
        if ext == 'mp3':
            audio = MP3(file_path)
        elif ext == 'wav':
            audio = WAVE(file_path)
        elif ext in ['m4a', 'aac']:
            audio = MP4(file_path)
        else:
            audio = mutagen.File(file_path)

        duration = audio.info.length
        if duration < MIN_DURATION_SEC:
            raise HTTPException(status_code=400, detail=f"Audio too short ({duration:.1f}s). Minimum is {MIN_DURATION_SEC}s.")
        if duration > MAX_DURATION_SEC:
            raise HTTPException(status_code=400, detail=f"Audio too long ({duration:.1f}s). Maximum is {MAX_DURATION_SEC}s.")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail="Corrupted or invalid audio file.")
