
# PathFolio — Local Resume Analyzer & Career Pathway Guide

PathFolio is a local-first web app that helps freshly graduated students and early-career users analyze their resumes and discover clear career pathways. The app is built with a React + Vite frontend and a planned local Python-based AI backend (TinyLLaMA) for structured parsing and feedback.

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
	- A local Python process uses rule-based parsing then TinyLLaMA to convert sections into a strict JSON schema.
	- The Python process then runs analysis prompts to produce feedback "cards".

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

The Python backend will live outside the current frontend folder (or in a `backend/` subfolder). Suggested tools and notes:

- Python 3.10+
- Use a venv:

```bash
python -m venv .venv
source .venv/bin/activate   # on Windows with bash: .venv\\Scripts\\activate
pip install --upgrade pip
```

Recommended `requirements.txt` (example):

```
PyMuPDF==1.22.0
tinyllama==<version-or-local-build>
regex
```

Key backend stages:
- Stage 1: Text extraction (PyMuPDF / fitz) from PDF
- Stage 2: Rule-based section parsing (Python `re` and string methods)
- Stage 3: Structured parsing using TinyLLaMA (prompt -> strict JSON schema)
- Stage 4: Analysis & feedback generation using TinyLLaMA prompts, produce cards

Note: TinyLLaMA setup is advanced (weights, local GPU/CPU inference). If you don't have TinyLLaMA ready, you can stub the parsing/analysis with rule-based heuristics or a small local model.

## Example flow for Version 1 (how to test now)

1. Start frontend (see commands above).
2. Open the Resume Analyzer page and fill the form (or click "Load default").
3. Click "Save & Submit" — the page will show a structured JSON preview that represents the data that would be sent to the backend for analysis.

## Extending to Version 2 / 3 (implementation notes)

- Create a `backend/` Python service that accepts the structured data or raw resume text via a simple local HTTP API (Flask/FastAPI).
- For file uploads, accept a file, extract text with PyMuPDF, and reuse the same parsing + TinyLLaMA prompts.
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
