# GitHub Pages Setup — Learn with Nelson

This package adds a MkDocs + Material website to the existing repository without changing the existing GitHub technical/tutorial companion folders.

## Why this structure?

- `start-here/`, `foundations/`, etc. remain the technical GitHub source of truth.
- `site/` contains the public learning articles and navigation pages.
- `mkdocs.yml` contains site-wide navigation and configuration.
- `.github/workflows/pages.yml` builds and deploys the website automatically.
- `_site/` is generated during builds and should never be edited manually.

## One-time GitHub setting

After pushing these files:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Go to **Actions** and confirm the Pages workflow succeeds.
5. The initial site URL should be:
   `https://nelsondsouza.github.io/learn-with-nelson/`

## Local preview

Install dependencies:

```powershell
py -m pip install -r requirements-pages.txt
```

Start a local preview:

```powershell
py -m mkdocs serve
```

Then open the local URL printed by MkDocs.

Build and validate:

```powershell
py -m mkdocs build --strict
```

## Adding each future tutorial

For every tutorial:

1. Build the GitHub technical companion first.
2. Add the full article under `site/tutorials/...`.
3. Add one navigation entry in `mkdocs.yml`.
4. Link the article to the GitHub companion.
5. Run `mkdocs build --strict`.
6. Commit and push.
7. GitHub Actions deploys the site automatically.
8. Create the LinkedIn post only after the article URL is live.

## URL policy

Use stable, descriptive slugs.

Good:
`/tutorials/start-here/t00-how-to-start-learning-tech/`

Avoid dates in tutorial URLs.

Do not rename published slugs casually. LinkedIn posts and search engines may already point to them.

## Navigation policy

Keep the top-level navigation stable:

- Home
- Tutorials
- Career Paths
- Projects
- AI at Work
- About

Inside Tutorials:

- Start Here
- Foundations
- Developer
- Data Analyst
- ML Engineer
- future specialist tracks

Do not put every tutorial in the top navigation.

## Content ownership

- GitHub companion = code, exercises, solutions, datasets, diagram source
- GitHub Pages article = complete 11-section learning experience
- LinkedIn = discovery and distribution

## Custom domain later

When a custom domain is selected, update `site_url` in `mkdocs.yml`, configure the domain in GitHub Pages settings, verify the domain with GitHub, and enable HTTPS.
