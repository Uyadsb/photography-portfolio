# Iyad Sebti — Photography Portfolio

React + Vite + HashRouter, static, hosted on GitHub Pages. No backend, no database.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
```

## Run with Docker

```bash
docker compose up --build        # dev server with hot reload -> http://localhost:5173
```
Edit files on your PC and the browser updates instantly. Stop with `Ctrl+C`, or `docker compose down`.

To test the production build under a GitHub-Pages-style subpath:
```bash
REPO_NAME=your-repo-name docker compose --profile preview up --build preview
# -> http://localhost:4173/your-repo-name/
```
(On Windows PowerShell: `$env:REPO_NAME="your-repo-name"; docker compose --profile preview up --build preview`.)
After adding a package with `npm install`, rebuild with `docker compose up --build`.

## Structure

```
public/images/        hero/  about/  <project-slug>/{cover,photo-01…}.webp
src/data/projects.js  ← every project is defined here
src/config.js         ← name, email, Instagram, EmailJS settings
src/components/       Header, Footer, Hero, ProjectGrid, ProjectCard, Gallery, Lightbox, ContactCTA, Reveal
src/pages/            Home, ProjectPage (one template for ALL projects), About, Contact, NotFound
src/styles/           global.css (tokens, motion) · components.css · responsive.css
scripts/              generate-placeholders.py (optional dev tool)
.github/workflows/    deploy.yml
```

## Add a new project

1. Create `public/images/<slug>/` with `cover.webp` and `photo-01.webp`, `photo-02.webp`, …
2. Add an object to `src/data/projects.js` (copy an existing one). For each photo use
   `photo('<slug>', n, width, height, 'alt text')` with the file's **real pixel size**.
   The gallery lays photos out from their orientation: wide photos go inset / full-bleed,
   tall photos are paired with an offset. Mix both for the best rhythm.
3. Commit and push. The homepage card, route `#/work/<slug>`, and previous/next links appear automatically.

Export photos as WebP, about 2000 px on the long edge, quality 75–80.

## Replace the placeholders

Every image currently in `public/images/` is a labelled placeholder. Overwrite files **with the same name**
(`hero/hero.webp`, `about/portrait.webp`, each project's `cover.webp` and `photo-NN.webp`), then update the
`width`/`height`/`alt` values in `projects.js`. Also replace:

| What | Where |
|---|---|
| Email, Instagram handle and URL | `src/config.js` |
| Example projects (titles, dates, descriptions) | `src/data/projects.js` |
| Biography / working approach copy (editable placeholder) | `src/pages/About.jsx`, `src/pages/Home.jsx` |
| Social preview image (needs an absolute URL once you have a domain) | `index.html` (`og:image`) |

## Deploy to GitHub Pages

1. Push this project to a GitHub repository, default branch `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main` (or run the workflow from the **Actions** tab). The workflow builds and deploys.
4. The site appears at `https://<username>.github.io/<repository-name>/`.

The base path is set automatically from the repository name (`VITE_BASE` in the workflow), and all image paths use
`import.meta.env.BASE_URL`, so nothing needs hard-coding. HashRouter means deep links like
`/#/work/ctf-competition` work without server rewrites.

## Contact form (EmailJS)

GitHub Pages cannot run server code, so the form needs an external service. Until it is configured, the form
validates, then tells the visitor **nothing was sent** and offers a prefilled `mailto:` link instead.

1. Create a free account at emailjs.com, add an email service, and create a template using these variables:
   `from_name`, `reply_to`, `event_type`, `event_date`, `event_location`, `message`.
2. Copy the Service ID, Template ID and Public Key.
3. In GitHub: **Settings → Secrets and variables → Actions → Variables**, add
   `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, then re-run the workflow.
   (For local testing, copy `.env.example` to `.env.local`.)
4. In EmailJS, restrict allowed origins to your site's domain. The public key is visible in the built JS by design.

## Accessibility & performance notes

Semantic landmarks, skip link, focus management on route change and in the lightbox (focus trap, Escape, arrows,
swipe), labelled form fields with `aria-describedby` errors, `prefers-reduced-motion` support, lazy-loaded gallery
images with explicit dimensions, no runtime dependencies beyond React and React Router.
