# Michael Kare — editorial redesign

The existing Next.js 15 / React 19 portfolio has been redesigned in place. Run `npm ci`, then `npm run dev`. The production commands remain `npm run build` and `npm start`. No hosting or external account configuration is needed to run locally.

## What changed

- Full-screen, two-line Michael Kare identity with a short sticky scroll sequence, scrubbed typography movement, and the original portrait.
- Six featured projects: Solace, Joux, Sushi Enya, Kim Kimble, Knowi.ai, and Folio. Large alternating compositions use short sticky holds, scroll-linked image masks and scale, and restrained hover controls.
- The remaining 18 projects form an editorial archive with a sticky preview that updates on hover or keyboard focus. Mobile entries include individual thumbnails.
- Eight original disciplines, a concise profile with the complete original biography in an expandable section, and photography connected to the existing creative-work route.
- Shared editorial navigation, a native résumé dialog with focus containment, and a contact footer with working email and social links.
- Original DM Sans, CSS Modules, Lenis, Framer Motion, project data, and case-study routes retained. No GSAP or competing scroll engine added.

## Source map

- `components/EditorialHome.jsx`: new homepage sections and motion values. Change the `FEATURED` slug array here to curate featured projects.
- `components/EditorialHome.module.css`: fluid typography, spacing, responsive behavior, and reduced-motion styles.
- `data/siteData.js`: unchanged original content and project URLs.
- `components/Header.*`, `components/Footer.*`: navigation and shared footer.
- `components/SmoothScroll.jsx`: a single Lenis instance per page, cleaned up on unmount and when reduced-motion preferences change.
- `public/editorial/`: 26 lightweight WebP derivatives, approximately 1.6 MB combined. All original media remain in `public/placeholders/`.
- `scripts/dev.mjs`: forwards development arguments to Next.js and translates preview-runner host flags. Normal `npm run dev` works as usual.
- `next.config.mjs`: separate `.next-dev` and `.next` output directories prevent development and production-build cache collisions.

Previous homepage components are retained but are no longer imported by the homepage. Case-study layouts and content remain intact and inherit the shared navigation, typography, colors, and footer.

## Accessibility and responsive behavior

Motion uses transforms, opacity, and clipping driven by Framer Motion values rather than React state updates on every scroll frame. Small screens and coarse-pointer devices use a shorter, unpinned sequence. Reduced-motion preferences disable smooth scrolling and decorative scroll transforms. All project links work without hover. The site includes visible keyboard focus, a skip link, semantic headings, image descriptions, and native disclosure/dialog controls.

## Validation

- Production build completed successfully and generated every existing route.
- SHA-256 comparison against the supplied ZIP confirmed that all 170 original media files and all 26 project route source files were unchanged.
- Browser review used viewport frames at 390, 768, 1024, 1440, and 1728 pixels. No horizontal document overflow was observed at those widths.
- Checked desktop and mobile hero composition, selected-work navigation, archive display, mobile menu, résumé open/close controls, and navigation from the archive to the OMT Enterprises case study.
- Reduced-motion behavior was checked in the implementation, but OS-level preference emulation and physical-device touch testing were not available in this browser environment.

This deliverable is the updated source project. It has not been deployed or pushed to a remote repository. The supplied Next.js and React dependency versions were retained; dependency upgrades were outside this visual redesign.
