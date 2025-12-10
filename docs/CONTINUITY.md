# CONTINUITY.md — Mandatory Multi-Agent Continuity Standard

This document defines the **Universal Continuity Requirement** for this project.

It is a **priority document** that MUST be read and respected by **all agents**:
- ChatGPT (Architect & Orchestrator)
- DeepSeek (Creative Strategist, PM, Red-Team Analyst)
- Gemini (Feature Generator, Code Writer)
- Cursor (Local Executor, Integrator, Debugger)
- Bolt (CI, Automation, Validation)
- Human (Project Owner)

## 1. Start-of-Session Ritual
Before performing any work, every agent must:
1.  **Read** `docs/PROJECT_OVERVIEW.md` to ground the session in the current context.
2.  **Read** `docs/CONTINUITY.md` (this file) to review protocols.
3.  **Read** `docs/PENDING_ITEMS.md` to identify high-priority tasks.
4.  **Read** `docs/SESSION_HISTORY.md` to understand the most recent changes.

## 2. End-of-Session Handover
Before ending a session, every agent must:
1.  **Update** `docs/PROJECT_OVERVIEW.md` with "Most Recent Work" and "Last Updated" metadata.
2.  **Log** the session in `docs/SESSION_HISTORY.md`.
3.  **Update** `docs/PENDING_ITEMS.md` (check off completed items, add new ones).
4.  **Record** any critical architectural notes in `docs/NOTES_CHATGPT.md`.

## 3. Universal Continuity Requirement
All agents must help maintain long-term continuity across all repositories.
Agents MUST record information that future agents will need, including:
- Communications intended for future ChatGPT, Gemini, Cursor, Bolt, and DeepSeek sessions
- Context that would otherwise be lost between builds, merges, branches, or deployments
- Architectural decisions, reasoning, constraints, and technical assumptions

## 4. Cross-Agent Communication Rules
- **Explicit Handoffs**: If a task requires another agent's specific skill (e.g., "DeepSeek for Red Teaming"), note this in `PENDING_ITEMS.md`.
- **No Hidden Context**: Do not rely on conversation history alone. If it's important, write it in a `docs/` file.
- **Reference Standard**: Use file paths (e.g., `src/components/App.tsx`) clearly in all logs.

## 5. Priority Levels
Tasks in `PENDING_ITEMS.md` must be categorized:
- 🔴 **Critical**: Blocks deployment or core functionality.
- 🟡 **High**: Important feature or bug fix.
- 🟢 **Medium**: Nice-to-have, optimization, or refactoring.
- 🔵 **Low**: Cosmetic, documentation tweak, or future idea.

## 6. Conflict Resolution
If documentation conflicts with code:
1.  Trust the **Code** for current behavior.
2.  Trust the **Spec** for intended behavior.
3.  Update the documentation to match the code (if code is correct) or flag the code as buggy (if spec is correct).

## 7. Emergency Recovery Procedure
If the project enters a broken state:
1.  Check `docs/SESSION_HISTORY.md` for the last stable state.
2.  Revert changes if necessary.
3.  Log the failure and cause in `docs/REDTEAM.md` under "Incident Log".

## 8. Verification & Audit Requirements
- **Bolt** acts as the primary validator for CI/CD checks.
- **Human** validation is required for UI/UX changes (Visual confirmation).
- **DeepSeek** performs logic and security audits upon request.
