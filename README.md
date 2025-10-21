
# PathFolio — Local Resume Analyzer & Career Pathway Guide

PathFolio is a local-first web app that helps freshly graduated students and early-career users analyze their resumes and discover clear career pathways. The app is built with a React + Vite frontend and a planned AI-backed analysis step. The current primary integration uses the OpenAI API (you provide an OpenAI API key). A local model such as TinyLLaMA is still an optional fallback for fully offline setups and may be implemented later.

This repository contains the frontend UI and the description/roadmap for the backend components. The project is designed to run mostly on the user's machine (no cloud dependencies required for the MVP).

## Project Overview

- Problem: Students and recent graduates often don't know how to structure a resume or what to highlight for a given role.
- Audience: High school / college graduates and early-career jobseekers.
- Core Solution: A local app that analyzes resumes, provides improvement cards, and generates a skill-first career timeline tailored to a target job.

## Three-version roadmap

1. Version 1 — Form-based (current MVP):
	- User copies parts of their resume into a guided form (skills, experiences, education, summary).
	- Frontend stores profile data in `localStorage` and sends structured JSON to the analysis step (for now this can be mocked or processed locally in JS).
	- Fast to implement and easy for users with short resumes.

2. Version 2 — Full-text parse:
	- User pastes their full resume text into the app.
	- A Python process performs rule-based parsing and then uses the configured analysis backend (OpenAI API by default) to convert sections into a strict JSON schema.
	- The analysis prompts produce feedback "cards". If you need a fully offline option, a local model such as TinyLLaMA can be added later as a fallback.

3. Version 3 — File upload & extraction:
	- User uploads a PDF/DOCX resume.
	- Python uses PyMuPDF (fitz) or another extractor to get raw text, then follows the Version 2 pipeline.

## What’s in this repo (frontend)

- `index.html`, `src/` — React + Vite app source
- `src/components/ResumeForm.jsx` — first-version form for collecting resume parts
- `src/ResumeAnalyzer.jsx` — analyzer page that will collect and show structured data
- `package.json` — node scripts and dependencies

## Quick start — Frontend (React + Vite)

Prerequisites:
- Node.js (recommended 18+)
- npm (or yarn)

Install and run dev server:

```bash
cd ./BusinessCase_1-PathFolio
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173) in your browser.

Try the first-version Resume form: fill fields, use "Load default" to see sample data, then "Save & Submit" to preview structured JSON in the app.

## Python backend (planned)

The project currently targets the OpenAI API for the analysis step. For now this repo focuses on the frontend and making calls to an analysis service that uses an OpenAI API key. A full Python backend (for file upload, local text extraction, or optional local models) is a stretch goal and can be added later if you want offline file parsing or heavier processing.

Configuring an OpenAI API key (recommended)

Important: do NOT embed a secret API key into client-side code that runs in the browser. Exposing an OpenAI key in the frontend will leak it to users and can lead to unexpected charges. Instead, either:

- Use a small server-side proxy that stores the `OPENAI_API_KEY` and forwards requests from the frontend, or
- For local development, use environment variables and a local dev server that keeps the key out of the shipped client bundle.

Example: local proxy (simple guidelines)

1. Set an environment variable on your machine or in your server environment:

```bash
# Linux / macOS / WSL
export OPENAI_API_KEY="sk-..."

# Windows (PowerShell)
setx OPENAI_API_KEY "sk-..."
```

2. In a small backend (Express, FastAPI, etc.) read the `OPENAI_API_KEY` from process env and make requests to the OpenAI API on behalf of the frontend.

Example Vite dev-time note (if you use .env):

```
// .env.local (do not commit)
VITE_API_PROXY_URL=http://localhost:3000
```

Then your frontend can call the local proxy at `import.meta.env.VITE_API_PROXY_URL` without including the secret key in the bundle.

Stretch goal: Python backend for file upload

If you later want to add PDF/DOCX upload and server-side extraction, a Python backend using PyMuPDF (fitz) is suitable. Keep this as a stretch goal — the frontend-first approach works well for early testing without requiring Python infrastructure.

## Example flow for Version 1 (how to test now)

1. Start frontend (see commands above).
2. Open the Resume Analyzer page and fill the form (or click "Load default").
3. Click "Save & Submit" — the page will show a structured JSON preview that represents the data that would be sent to the backend for analysis.

## Extending to Version 2 / 3 (implementation notes)

- Create a `backend/` Python service that accepts the structured data or raw resume text via a simple local HTTP API (Flask/FastAPI).
-- For file uploads, accept a file, extract text with PyMuPDF, and reuse the same parsing + analysis prompts (OpenAI by default; local model fallback possible).
- Keep prompts and JSON schema strict and well-documented so parsing is reliable.

## Data & privacy

PathFolio is designed to run fully locally. No data should be sent to third-party services by default. Be explicit in code when/if you add optional cloud integrations.

## Next steps / TODOs

- Implement Python backend with PyMuPDF + TinyLLaMA integration.
- Add tests for rule-based parsing and prompt/output validation.
- Improve frontend UX for editing and previewing feedback cards.

## Contributing

Feel free to open issues and pull requests. For significant changes (backend design, model integration), open an issue first to discuss design choices.

## License

This project is currently unlicensed. Add a LICENSE file if you'd like to set terms for reuse.
