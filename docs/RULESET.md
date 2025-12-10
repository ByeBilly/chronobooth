# RULESET.md

Governing rules for the ChronoBooth project.

## 1. Multi-Agent Collaboration
- **Handover**: Always update `PROJECT_OVERVIEW.md` before finishing a task.
- **Context**: Read `CONTINUITY.md` before starting.
- **Respect**: Do not undo another agent's work without valid reasoning logged in `NOTES_CHATGPT.md`.

## 2. Documentation Updates
- **Sync**: If you change code logic, update `SPEC.md`.
- **Logs**: Record significant events in `SESSION_HISTORY.md`.
- **Risks**: Log new risks in `REDTEAM.md`.

## 3. Code Quality
- **Types**: Use TypeScript interfaces for all data structures.
- **Components**: Keep components small and focused (Single Responsibility).
- **Styling**: Use Tailwind utility classes; avoid inline styles.
- **Error Handling**: All async operations (API calls) must have try/catch blocks with user-facing error states.

## 4. Git / Version Control
- **Commits**: Descriptive messages.
- **Branches**: `main` is stable. Feature work happens in branches (if applicable).

## 5. Continuity and Handover
- **Mandatory**: Follow the rituals defined in `CONTINUITY.md`.
- **Persistence**: Assume the next agent has zero memory of this session. Write everything down.
