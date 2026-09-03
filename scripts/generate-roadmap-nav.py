import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MKDOCS = ROOT / "mkdocs.yml"
DATA = ROOT / "site" / "roadmaps" / "_data" / "roadmaps.json"

CAREERS_DIR = ROOT / "site" / "roadmaps" / "careers"
TOPICS_DIR = ROOT / "site" / "roadmaps" / "topics"

data = json.loads(DATA.read_text(encoding="utf-8"))
roadmaps = data["roadmaps"]

by_season = {}
for roadmap in roadmaps:
    by_season.setdefault(roadmap["season"], []).append(roadmap)


def yaml_title(title):
    return title.replace("\\", "\\\\").replace('"', '\\"')


# -------------------------------------------------------------------
# Careers
# -------------------------------------------------------------------

career_pages = []

for page in sorted(CAREERS_DIR.glob("*.md")):
    if page.name == "index.md":
        continue

    slug = page.stem

    # Use the page title from the Markdown heading when available.
    content = page.read_text(encoding="utf-8")
    match = re.search(r"^#\s+(.+?)\s*$", content, re.MULTILINE)

    if match:
        title = match.group(1).strip()
    else:
        title = slug.replace("-", " ").title()

    career_pages.append(
        (title, f"roadmaps/careers/{page.name}")
    )


# -------------------------------------------------------------------
# Topics
# -------------------------------------------------------------------

topic_pages = []

for page in sorted(TOPICS_DIR.glob("*.md")):
    if page.name == "index.md":
        continue

    slug = page.stem

    # Use the page title from the Markdown heading when available.
    content = page.read_text(encoding="utf-8")
    match = re.search(r"^#\s+(.+?)\s*$", content, re.MULTILINE)

    if match:
        title = match.group(1).strip()
    else:
        title = slug.replace("-", " ").title()

    topic_pages.append(
        (title, f"roadmaps/topics/{page.name}")
    )


# -------------------------------------------------------------------
# Build Roadmaps navigation
# -------------------------------------------------------------------

lines = [
    "  - Roadmaps:",
    "      - roadmaps/index.md",

    "      - Careers:",
    "          - roadmaps/careers/index.md",
]

for title, page in career_pages:
    lines.append(f'          - "{yaml_title(title)}": {page}')

lines.extend([
    "      - Topics:",
    "          - roadmaps/topics/index.md",
])

for title, page in topic_pages:
    lines.append(f'          - "{yaml_title(title)}": {page}')

lines.append("      - Seasons:")

for season in sorted(by_season):
    lines.append(f'          - "Season {season}":')
    lines.append(
        f"              - roadmaps/seasons/season-{season:02d}/index.md"
    )

    for roadmap in sorted(
        by_season[season],
        key=lambda x: x["number"]
    ):
        title = yaml_title(roadmap["title"])

        page = (
            f'roadmaps/seasons/season-{season:02d}/'
            f'roadmaps/{roadmap["slug"]}.md'
        )

        lines.append(
            f'              - "{roadmap["number"]:02d} — {title}": {page}'
        )


new_block = "\n".join(lines)

text = MKDOCS.read_text(encoding="utf-8")

pattern = r"(?ms)^  - Roadmaps:\s*\n.*?(?=^  - Projects:)"

match = re.search(pattern, text)

if not match:
    raise SystemExit(
        "ERROR: Could not find the Roadmaps navigation block."
    )

text = (
    text[:match.start()]
    + new_block
    + "\n"
    + text[match.end():]
)

MKDOCS.write_text(text, encoding="utf-8")

print(
    f"Generated Roadmaps navigation: "
    f"{len(roadmaps)} roadmaps, "
    f"{len(career_pages)} career pages, "
    f"{len(topic_pages)} topic pages."
)