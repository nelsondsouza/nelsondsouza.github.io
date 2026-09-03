import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MKDOCS = ROOT / "mkdocs.yml"
DATA = ROOT / "site" / "roadmaps" / "_data" / "roadmaps.json"

data = json.loads(DATA.read_text(encoding="utf-8"))
roadmaps = data["roadmaps"]

by_season = {}
for roadmap in roadmaps:
    by_season.setdefault(roadmap["season"], []).append(roadmap)

lines = [
    "  - Roadmaps:",
    "      - roadmaps/index.md",
    "      - Seasons:",
]

for season in sorted(by_season):
    lines.append(f'          - "Season {season}":')
    lines.append(
        f"              - roadmaps/seasons/season-{season:02d}/index.md"
    )

    for roadmap in sorted(by_season[season], key=lambda x: x["number"]):
        title = roadmap["title"].replace("\\", "\\\\").replace('"', '\\"')
        page = (
            f'roadmaps/seasons/season-{season:02d}/'
            f'roadmaps/{roadmap["slug"]}.md'
        )
        lines.append(f'              - "{roadmap["number"]:02d} — {title}": {page}')

new_block = "\n".join(lines)

text = MKDOCS.read_text(encoding="utf-8")

pattern = r"(?ms)^  - Roadmaps:\s*\n.*?(?=^  - Projects:)"

match = re.search(pattern, text)
if not match:
    raise SystemExit("ERROR: Could not find the Roadmaps navigation block.")

text = text[:match.start()] + new_block + "\n" + text[match.end():]

MKDOCS.write_text(text, encoding="utf-8")

print(f"Generated Roadmaps navigation for {len(roadmaps)} roadmaps.")
