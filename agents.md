# Site Agent Notes

## Purpose
This repository is a personal static site. The current structure is centered on a clean home page and a single `writings/` archive that also contains project-style articles.

## Public Structure

- `index.html`
  - Home page
  - Shows the name once as the main header
  - Navigation currently contains `Writings` and external links
  - Includes a hidden Knowledge Map link for private access
  - No homepage animation or carousel

- `writings/index.html`
  - Main archive page
  - Has featured cards at the top
  - Lists:
    - Site archive articles
    - Project articles
    - Wolfram Community articles
  - No top-right page-self nav link
  - There is no separate public `Projects` page anymore

- `writings/tangent-animation/`
- `writings/metamathematics-concept-list/`
- `writings/von-neumann-ordinals/`
- `writings/sum-of-n-natural-numbers/`
- `writings/theorem-prover-overview/`
  - Original writing articles, each in its own folder with its own `index.html`

- `writings/terraformer-for-dummies/`
- `writings/terraformer-research-project/`
- `writings/gt-off-road/`
  - Project articles moved into `writings/`
  - Each page keeps its own local assets folder

- `writings/featured/`
  - Featured thumbnails for the archive page

- `writings/_article-template.html`
  - Shared article shell used to generate the public article pages

- `writings/_content/`
  - Source fragments for generated articles
  - Edit these fragments when changing article content if you want to preserve the template workflow

- `scripts/build-articles.mjs`
  - Regenerates article pages from the shared template and `_content` fragments

- `KMbeta1/`
  - Knowledge Map section
  - Treated as separate and intentionally preserved
  - Do not reorganize or restyle unless explicitly requested

## Hidden Knowledge Map Access

- There is a non-visible link in `index.html` pointing to:
  - `KMbeta1/kmdirectory.html`
- This is intentionally hidden from normal navigation.
- The browser URL is:
  - `http://127.0.0.1:<port>/KMbeta1/kmdirectory.html`

## Important Rules

- Do not reintroduce a public `Projects` page or nav link unless explicitly requested.
- Do not move or restyle `KMbeta1` when updating the site unless the user explicitly asks for it.
- Keep article-relative asset paths local to the article folder whenever possible.
- If an article is copied into `writings/`, update the matching fragment in `writings/_content/` and rerun `node scripts/build-articles.mjs`.
- The generated article pages should keep using `../../assets/css/site.css` and the shared template.

## Current Content Ordering

- `writings/index.html` is organized by rough recency.
- The project articles section currently starts with:
  1. `GT Off-Road`
  2. `Terraformer For Dummies`
  3. `Terraformer Research Project Writeup`

## Notes for Future Edits

- The site intentionally uses a traditional, clean layout.
- Keep changes scoped.
- Avoid exposing hidden or private utility links in visible navigation.
- Check `git diff --check` after edits.
