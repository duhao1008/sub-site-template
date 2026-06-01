# Sub Site Template

This is a reusable Vue + Vite template for small SEO-focused utility sub-sites.

## Copy Checklist

1. Copy this folder and rename the new project directory.
2. Update `package.json` name.
3. Update `src/site.config.ts`:
   - `name`
   - `domain`
   - `contactEmail`
   - `relatedTools`
   - `apps`
4. Update routes and slugs in `src/i18n/content.ts`.
5. Replace page titles, descriptions, H1s, FAQ, and localized UI text in `src/i18n/content.ts`.
6. Replace the tool implementation in `src/utils/` and `src/components/ToolWorkbench.vue` if the new sub-site is not a JSON tool.
7. Update `public/robots.txt` and `public/sitemap.xml` with the real production domain.
8. Run `npm install` after copying if `node_modules` was not copied.
9. Run `npm run build` before publishing.

## Useful Files

- `src/site.config.ts`: shared site name, domain, email, and matrix links.
- `src/i18n/content.ts`: locales, slugs, nav IDs, SEO text, and page content.
- `src/router/index.ts`: generated localized routes.
- `src/views/`: page shells.
- `src/components/ToolWorkbench.vue`: primary interactive tool UI.
- `src/styles/main.css`: global layout and visual system.

## Notes

Keep generated files out of copied projects: `node_modules`, `dist`, `.idea`, `*.tsbuildinfo`, `vite.config.js`, and `vite.config.d.ts` are ignored.
