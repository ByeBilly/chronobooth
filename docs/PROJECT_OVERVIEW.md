# PROJECT_OVERVIEW.md — Session Starter / Continuation Brief

This document is the high-level, always-up-to-date summary of the project.

The human will copy/paste this file at the beginning of new sessions with
ChatGPT, Gemini, Cursor, Bolt, or DeepSeek to provide immediate context.

All agents must keep this file accurate and current.

## 1. Project Name
ChronoBooth

## 2. Current Vision / Purpose
A time-travel photo booth web application that transports users to historical eras using Gemini AI. It captures a user's photo, analyzes their identity, and generates a new image of them in a selected historical setting (e.g., Roaring 20s, Cyberpunk, Wild West) while preserving facial features.

## 3. Key Features / Modules
- **Camera Module**: Real-time video feed with capture functionality and mirroring.
- **Image Uploader**: Support for uploading existing photos.
- **Gemini Service**: 
  - Image Analysis (Gemini 3 Pro) for identity preservation.
  - Image Generation (Gemini 2.5 Flash) for style transfer and editing.
- **Era Selection**: Pre-defined eras with specific prompt modifiers.
- **UI/UX**: Responsive Tailwind CSS design with "Chrono" aesthetics.

## 4. Current Status
Functional prototype. Users can capture/upload images, analyze them, select an era, and generate a result.

## 5. Active Branches / Environments
- **main**: Primary development branch.
- **Environment**: Browser-based React application using ES modules.

## 6. Most Recent Work
- Implemented `services/gemini.ts` with `gemini-3-pro-preview` for analysis and `gemini-2.5-flash-image` for generation.
- Created Camera and ImageUploader components.
- Established basic UI and State management in `App.tsx`.
- Updated documentation to Global Multi-Agent Continuity System.

## 7. Known Issues / Risks
- Generation latency depends on API response times.
- Quality of likeness preservation varies based on source image quality.
- API Key exposure (currently client-side, prototype only).

## 8. Next Intended Actions
- Refine prompt engineering for better era accuracy.
- Add more eras.
- Improve error handling for API quotas.

## 9. User Feedback Highlights
(Awaiting initial user feedback)

## 10. Last Updated
- **Date**: 2024-05-23
- **Agent**: Gemini
- **Summary**: Aligned documentation with Global Continuity Standard.