# Yugal Chaudhari — Portfolio

This is a minimal React + Vite portfolio with a 3D interactive card.

## What you get
- A single-page React app with an interactive 3D card showing name, education, skills, hobbies, and contact info.

## Run locally (Windows / PowerShell)
1. Open a terminal in the `portfolio` folder
2. Install dependencies:

```powershell
npm install
```

3. Start dev server:

```powershell
npm run dev
```

The app will be available at the address printed by Vite (usually http://localhost:5173).

## Build

```powershell
npm run build
npm run preview
```

## Content
Name: Yugal Chaudhari

SY BTech student in AIDs from KJ Somaiya

Skills: video editing, Python, C++, Java, web dev, AI agent builder

Hobbies: art, football, fitness, make music

Contact:
- Email: yugalchaudharixa@gmail.com
- Phone: +91 99872 21840

## Next steps / enhancements
- Add animations and a portfolio/projects section with images or videos.
- Add routing and separate pages for projects and blog.
- Add deploy scripts (Netlify / Vercel) and CI.

## Deploying to Vercel (one-click or CLI)

This project is configured to deploy as a static site on Vercel. The Vite build outputs to `dist` and `vercel.json` tells Vercel to serve the `dist` folder and fallback to `index.html` for client-side routing.

Two common deployment methods:

- Deploy from a Git provider (recommended):
	1. Push this repository to GitHub/GitLab/Bitbucket.
 2. Go to https://vercel.com and import the repo.
 3. Vercel auto-detects the project. Ensure the build command is `npm run build` and the output directory is `dist`.

- Deploy with the Vercel CLI (quick preview):
	```powershell
	npm i -g vercel
	vercel login
	# run this from the project root
	vercel --prod
	```

Notes:
- The `build` script in `package.json` already runs `vite build` and produces `dist`.
- If you want preview/staging deployments, use `vercel` without `--prod` or use the Vercel web UI to configure branches.

If you want, I can also add a small GitHub Actions workflow to auto-deploy on push to `main`.
