# REDTEAM.md

Risk analysis, adversarial thinking, and mitigation strategies.

## Technical Risks

### 1. API Latency & Timeouts
- **Risk**: Image generation can take several seconds. Users might abandon the app if feedback isn't immediate.
- **Mitigation**: Implement engaging loading states (animations, "traveling" messages).
- **Status**: Basic loading state implemented. Needs improvement.

### 2. Identity Hallucination
- **Risk**: The model might ignore the source image face and generate a generic person.
- **Mitigation**: Strong prompting emphasizing "Keep the person's face and identity recognizable". Using Gemini 3 Pro for detailed description injection.
- **Status**: Implemented dual-pass approach (Analyze -> Generate).

### 3. Browser Compatibility
- **Risk**: `getUserMedia` (Camera) has varying support on mobile browsers (iOS Safari vs Android Chrome).
- **Mitigation**: Use standard MediaDevices API. Test on actual devices.
- **Status**: Untested on physical mobile devices.

## Business / Product Risks

### 1. Cost
- **Risk**: High resolution image generation on paid tiers can be expensive at scale.
- **Mitigation**: Use Flash models (lower cost) where possible. Limit free usage if deployed.

### 2. Safety / Content Policy
- **Risk**: Users might attempt to generate NSFW or offensive historical scenes.
- **Mitigation**: Rely on Gemini's built-in safety filters. Handle safety blocks gracefully in UI.

## Security Considerations
- **API Key Exposure**: Currently, the API key is exposed in the client-side code (typical for prototypes, fatal for production).
- **Mitigation**: Move to a server-side proxy for API calls in the next phase.
