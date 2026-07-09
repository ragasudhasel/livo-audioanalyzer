# Digital Personal Data Protection (DPDP) Compliance Policy

PronounceAI prioritizes user privacy and adheres strictly to the principles outlined in the Digital Personal Data Protection (DPDP) Act. This document details our data handling practices and compliance measures.

## 1. Minimal Data Collection
We practice strict data minimization. The application only collects:
- A single, temporary audio recording uploaded voluntarily by the user.
- The minimum required audio data necessary to perform the pronunciation analysis.

We do **not** collect:
- Names, emails, or personal identifiers.
- Persistent location data.
- Browser fingerprinting or extensive telemetry.

## 2. Temporary Storage and Automatic Deletion
Audio files are stored entirely in ephemeral memory or temporary filesystem locations (`/tmp` equivalent) during the active session. 
- **Immediate Deletion**: The audio file is aggressively deleted from the server the exact moment the speech-to-text processing (`faster-whisper`) completes.
- **No Long-term Storage**: Neither the audio file nor the generated transcript is saved to any long-term database or object storage (e.g., S3). 
- Once the HTTP response is returned to the client, the backend retains zero traces of the interaction.

## 3. Secure Processing (Data in Transit & Rest)
- **In Transit**: All audio uploads and analysis results are transmitted securely via HTTPS (TLS 1.2/1.3) to prevent interception.
- **Local AI Processing**: The core speech transcription happens **locally** on our backend servers using `faster-whisper`. We do not send raw voice recordings to any third-party APIs (like OpenAI or Google Cloud Speech) for transcription.
- **Third-Party Integrations**: The generated text transcript (which contains no personally identifiable information) is sent to Google Gemini solely to generate feedback. The Gemini API is configured to not use this data for model training.

## 4. User Consent
By uploading an audio file, users give explicit, purposeful consent for the audio to be analyzed for pronunciation scoring. The Landing Page clearly states that audio is processed temporarily and deleted immediately. There are no secondary, hidden uses of the data.

## 5. Data Residency
The PronounceAI backend and processing pipeline are hosted securely on [Hosting Provider, e.g., Render/AWS]. Since no data is persistently stored, cross-border data transfer concerns are effectively mitigated, ensuring strict compliance with local data localization requirements.

## 6. User Rights
Because we do not store personal data or link sessions to user identities, the following DPDP user rights are inherently respected:
- **Right to Erasure**: Implemented automatically (files deleted post-processing).
- **Right to Access/Correction**: N/A, as no profiles or data records exist.

## 7. Future Compliance Roadmap
If PronounceAI implements user accounts (Authentication) and history tracking in the future, we will:
1. Implement an explicit Opt-In consent checkbox for data retention.
2. Provide a self-service "Delete My Account & Data" portal within the dashboard.
3. Ensure the database layer is encrypted at rest.
