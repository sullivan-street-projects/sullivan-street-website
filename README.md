# Sullivan Street Projects Website

## Project Overview
This is the marketing website for Sullivan Street Projects, a fractional growth consultancy.
It is built with React, Vite, Tailwind CSS, and Framer Motion.

## Key Files
- **`src/CONTENT.md`**: The single source of truth for all website text.
- **`public/llms.txt`**: A summarized version of the site content optimized for AI crawlers (AEO).
- **`src/constants/index.js`**: Contains structured data arrays (like Partner Outcomes).

## Content Updates
When updating content on the site:
1.  **Primary Text:** Edit `src/CONTENT.md`.
2.  **AI Optimization:** If you make significant changes to the services, bio, or value props in `CONTENT.md`, **you must manually update `public/llms.txt`** to reflect these changes. This ensures AI search engines have the latest info.
3.  **Structured Data:** If you add new partner outcomes or services, update `src/constants/index.js`.
