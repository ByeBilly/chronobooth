# SPEC.md

Product Specification for ChronoBooth.

## 1. Core Features

### Camera Module
- **Live Preview**: Real-time video feed mirrored horizontally.
- **Capture**: Freeze frame and convert to Base64 string.
- **Device Selection**: Defaults to 'user' facing mode.

### Image Uploader
- **File Input**: Accepts JPG, PNG, WebP.
- **Drag & Drop**: Supported zone.

### Identity Analysis (Gemini 3 Pro)
- **Input**: User photo (Base64).
- **Prompt**: "Analyze this image. Describe the person's physical appearance..."
- **Output**: Text description of facial features.

### Time Travel Generation (Gemini 2.5 Flash)
- **Input**: Source image + Era Prompt + Custom Instruction + Analysis Text.
- **Process**: Uses model to "edit" or "generate" based on source.
- **Output**: New image URL.

## 2. Architecture

### Frontend
- **Framework**: React 19.
- **Styling**: Tailwind CSS via CDN.
- **Build**: ES Modules (no bundler config in this specific repo setup).

### Data Flow
1. User Capture -> State (`sourceImage`)
2. `sourceImage` -> `gemini.analyzeImage()` -> State (`analysisText`)
3. `sourceImage` + `selectedEra` -> `gemini.generateTimeTravelPhoto()` -> State (`resultImage`)
4. `resultImage` -> Display/Download.

## 3. Data Models

### Era
```typescript
interface Era {
  id: string; // e.g., 'ROARING_20S'
  name: string; // e.g., 'Roaring 20s'
  description: string;
  promptModifier: string; // The text appended to the prompt
  icon: string; // Emoji
}
```

## 4. User Flows

### Main Flow
1. User lands on App.
2. User grants Camera permission OR uploads file.
3. User captures photo.
4. (Optional) User clicks "Analyze Face".
5. User selects an Era (e.g., "Cyberpunk").
6. User clicks "Initiate Time Travel".
7. App displays loading animation.
8. Result image appears.
9. User downloads image or resets.

## 5. Acceptance Criteria
- App must load without errors in Chrome/Safari.
- Camera must successfully capture an image.
- Gemini API must return a valid image string.
- "Time Travel" button must be disabled until a source image is present.
