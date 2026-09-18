# ETHAN TUTOR AI v2.0 — Ecosystem & Secure AI Ready

Domain: `tutor.ethandigitalacademy.org`

This build retains the v1.6 academic, assessment, mastery, revision, exam-preparation and progress features, and adds the first real integration layer.

## v2.0 major additions
- Real server-side `/api/tutor` endpoint for a compatible AI provider. No provider secret is placed in browser JavaScript.
- `/api/health` reports whether the AI service is configured without exposing secrets.
- Tutor chat now calls the secure server endpoint and degrades gracefully if AI is unavailable.
- Context-aware tutoring fields: `level`, `subject`, `topic`, `source_app`, `lesson_id`.
- Incoming learning context supported from Ethan Learn, LMS/ERP and Ethan Code through URL parameters, e.g. `?source=learn&level=JSS%201&subject=Mathematics&topic=Fractions&lesson_id=lesson-123`.
- Ethan ID button returns the learner to Ethan Hub with the Tutor URL as `return_to`. Final authenticated token/session exchange must match the production Ethan Hub SSO contract before it is enabled as trusted SSO.
- Explicit ecosystem status banner and v2.0 deployment marker.

## Vercel server environment variables for live AI
Set these only in Vercel/server settings, never in `assets/app.js`:
- `AI_API_URL` — HTTPS chat-completions-compatible endpoint
- `AI_API_KEY` — provider secret key
- `AI_MODEL` — provider model identifier

Until those variables are set, all lessons, practice, assessments, mastery and revision continue working; Ask Ethan Tutor clearly reports that live AI is not configured.

## Ethan ecosystem integration
The Tutor now accepts learning context from the other Ethan apps, but it does not pretend that cross-subdomain authentication is complete. The final Ethan ID token exchange should be wired to the existing Hub/Cloud SSO contract after that contract is verified. This avoids inventing an incompatible authentication flow.

## Security
- AI secrets stay server-side.
- Tutor input is length-limited and control characters are removed.
- Cross-origin API access is limited to the known Ethan learning domains.
- Responses are rendered as text in the chat, not injected as HTML.
- Existing iframe/code concerns do not apply to Tutor AI; no arbitrary code execution is introduced.


## v2.1 Comprehensive stability audit
- Fixed a critical integration-context crash caused by an undefined subject registry.
- Prevented repeated lesson clicks from farming completion counts/stars.
- Improved mastered-topic progression with a real next-topic recommendation.
- Reloads practice when subject/topic changes and prevents double submissions/racing timers.
- Generic study-skills quiz no longer corrupts academic topic mastery.
- Unsupported exam subjects no longer silently fall back to Mathematics and mis-credit progress.
- Added AI request timeout and timer cleanup to reduce hanging/background work.
- Added reduced-motion support and rendering containment for long-page performance.
- Optimized the official logo asset for faster initial loading.
- Storage migration hardened for older learner state.

## v2.2 Ask Ethan Tutor reliability upgrade
- Rebuilt Ask Ethan Tutor chat flow with conversation context/history.
- Added quick prompts, multiline input, character counter, stop response, new chat, focus/keyboard handling, and clearer AI status.
- Added graceful curriculum-aware offline guidance when server AI is not configured.
- Hardened API body parsing, input/history limits, timeouts, upstream errors, empty responses, and busy responses.
- Improved tutor system guidance for age-appropriate step-by-step teaching and calculations.
- Fixed malformed Escape-key event code that could repeatedly register lifecycle listeners.
- Live open-ended AI still requires server-only AI_API_URL, AI_API_KEY and AI_MODEL environment variables.
