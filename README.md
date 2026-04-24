# michael-kare-portfolio-2026

A clean Next.js App Router portfolio starter inspired by the rhythm, width, typography, and editorial spacing of jonhowell.com, but structured for your own copy, assets, and project covers.

## Stack

- Next.js App Router
- React 19
- CSS Modules
- `next/font` with DM Sans
- Lenis smooth scroll (`components/SmoothScroll.jsx`, `transpilePackages: ['lenis']`)

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Folder structure

```txt
michael-kare-portfolio-2026/
├─ app/
│  ├─ globals.css
│  ├─ layout.js
│  ├─ page.js
│  └─ page.module.css
├─ components/
│  ├─ AboutSection.jsx
│  ├─ CreativeWork.jsx
│  ├─ Footer.jsx
│  ├─ Header.jsx
│  ├─ Hero.jsx
│  ├─ ProjectCard.jsx
│  ├─ ProjectGrid.jsx
│  ├─ SectionLabel.jsx
│  └─ SmoothScroll.jsx
├─ data/
│  └─ siteData.js
├─ public/
│  └─ placeholders/
├─ jsconfig.json
├─ next.config.mjs
└─ package.json
```

## What to replace first

1. Replace every file in `public/placeholders/` with your real exported covers and portrait.
2. Update text in `data/siteData.js` with your exact Figma copy.
3. Adjust spacing and card aspect ratios in the CSS modules if your cover exports have different proportions.
4. Add real project detail routes later if you want case study pages.

## Notes for Cursor

- Keep layout primitives reusable and avoid hardcoding project content inside components.
- Keep all display content in `data/siteData.js` until you are ready for a CMS.
- Preserve the reduced-motion fallback when refining animation.
- Keep sections full-width and let the media dictate the composition.

## Good next upgrades

- Add `app/projects/[slug]/page.js` for case studies
- Add page transition helpers only after the base performance is solid
- Swap placeholder SVGs for optimized JPG/WebP exports
- Add a sticky side label or live section indicator if desired
