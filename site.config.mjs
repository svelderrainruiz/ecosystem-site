// Where the site is served. GitHub Pages serves a project site under its repository name, so every root-absolute link
// has to carry the base; the build prefixes Markdown links and `scripts/check-site.mjs` fails on one that does not.
export const site = 'https://svelderrainruiz.github.io';
export const base = '/ecosystem-site';
