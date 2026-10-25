# Muhammad Imam Nurokhi – Portfolio

Personal portfolio of Muhammad Imam Nurokhi, Tech Lead & Software Architect (Jakarta).

The whole site is one self-contained, bilingual (EN / ID) HTML page at
`public/index.html`: inline CSS and JS, inline images, light and dark themes.
Next.js only serves it at `/` (see the rewrite in `next.config.ts`) and
provides the 404 page, so it deploys to Vercel as a normal Next.js project.

## Sections

1. **About** – summary and key numbers
2. **Selected work** – 12 projects, filterable, each labelled with its real release gate
3. **AI-assisted engineering** – governed agent tooling
4. **Experience** – timeline, education, certifications, languages
5. **Toolkit** – skills by area
6. **Contact** – email, LinkedIn, GitHub

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build
npm test           # Playwright checks against public/index.html
BASE_URL=http://localhost:3000/ npm test   # same checks against a running server
```

Deploys run on Vercel only (no GitHub Actions): every push builds a preview and
`main` deploys to production. The Vercel build runs `npm run lint && npm run build`;
run `npm test` locally before pushing.

To edit content, change `public/index.html` directly. Indonesian strings live in
the `ID` dictionary in the page's script and are matched to elements by
`data-i18n` keys; `npm test` fails if a key is missing or orphaned.
