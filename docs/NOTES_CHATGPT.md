# NOTES_CHATGPT.md

Architectural intent, long-term guidance, and context for AI agents.

## Design Philosophy
- **"Magic First"**: The user experience should feel effortless. Complex AI operations (analysis, generation) should be wrapped in playful, thematic UI ("Time Travel", "Flux Capacitor").
- **Client-Side Simplicity**: The current architecture relies on direct client-side API calls to Google GenAI for prototyping speed.
- **Aesthetic Consistency**: The UI must strictly adhere to the `tailwind.config` colors (Chrono Dark, Panel, Accent) to maintain the sci-fi/retro theme.

## Critical Invariants
- **Identity Preservation**: The core value prop is putting *the user* in the era. We must always attempt to use the analysis from Gemini 3 Pro to inform the generation.
- **Model Selection**: 
  - Use `gemini-3-pro-preview` for complex reasoning/analysis.
  - Use `gemini-2.5-flash-image` for image generation/editing speed.
- **No Backend**: Do not introduce a Node/Python backend unless absolutely necessary for security (API key hiding) in production.

## Tech Stack Rationale
- **React + Tailwind**: Standard, fast, component-based.
- **Google GenAI SDK**: Native integration with Gemini models.
- **Vite/ES Modules**: Fast development server and build.

## Non-Negotiable Constraints
- **API Key**: Must be loaded from `process.env.API_KEY`.
- **Permissions**: Must explicitly request Camera permissions via browser APIs.

## Notes for Future Sessions
- If moving to production, a proxy server is required to hide the API key.
- Consider using `localStorage` to save user preferences or history temporarily.
