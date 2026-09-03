#!/usr/bin/env python3
from pathlib import Path
import argparse, json, sys

ROOT = Path(__file__).resolve().parents[1]
ROADMAP_ROOT = ROOT / 'site' / 'roadmaps'
DATA = ROADMAP_ROOT / '_data' / 'roadmaps.json'
IMAGE_ROOT = ROADMAP_ROOT / 'assets' / 'roadmap-images'
SEASON_ROOT = ROADMAP_ROOT / 'seasons'
EXPECTED = {1:27,2:21,3:31,4:31,5:30,6:38,7:30,8:30,9:40,10:30}


def main():
    ap = argparse.ArgumentParser(
        description='Validate Learn with Nelson roadmap architecture'
    )
    ap.add_argument(
        '--allow-missing-images',
        action='store_true',
        help='Skip physical WebP existence checks'
    )
    args = ap.parse_args()

    errors = []

    if not DATA.exists():
        errors.append(f'Missing metadata: {DATA}')
        return report(errors)

    data = json.loads(DATA.read_text(encoding='utf-8'))
    records = data.get('roadmaps')

    if not isinstance(records, list):
        return report(['roadmaps.json has no roadmaps list'])

    if len(records) != 308:
        errors.append(f'Expected 308 records; found {len(records)}')

    ids = set()
    pages = set()
    images = set()
    counts = {i: 0 for i in range(1, 11)}

    for r in records:
        req = [
            'id',
            'season',
            'number',
            'title',
            'slug',
            'source_file',
            'filename'
        ]

        miss = [k for k in req if k not in r]

        if miss:
            errors.append(
                f"Missing fields {miss}: {r.get('id', '<unknown>')}"
            )
            continue

        rid = r['id']
        season = int(r['season'])
        number = int(r['number'])
        slug = r['slug']
        filename = r['filename']

        if rid in ids:
            errors.append(f'Duplicate id: {rid}')

        ids.add(rid)

        if season not in counts:
            errors.append(f'Invalid season {season}: {rid}')
            continue

        counts[season] += 1

        # Canonical filename must remain the PNG master filename.
        expected_filename = Path(r['source_file']).name

        if filename != expected_filename:
            errors.append(
                f'Filename mismatch: {rid}: '
                f'{filename} != {expected_filename}'
            )

        page = (
            SEASON_ROOT
            / f'season-{season:02d}'
            / 'roadmaps'
            / f'{slug}.md'
        )

        # Published Pages asset is WebP.
        published_filename = Path(filename).with_suffix('.webp')

        image = (
            IMAGE_ROOT
            / f'season-{season:02d}'
            / published_filename
        )

        pages.add(page)
        images.add(image)

        if not page.exists():
            errors.append(f'Missing page: {page}')

        if not args.allow_missing_images and not image.exists():
            errors.append(f'Missing image: {image}')

        if page.exists():
            text = page.read_text(encoding='utf-8')

            rel = (
                f'../../../assets/roadmap-images/'
                f'season-{season:02d}/{published_filename}'
            )

            if rel not in text:
                errors.append(
                    f'Wrong/missing image reference in {page}; '
                    f'expected {rel}'
                )

    for s, expected in EXPECTED.items():
        if counts[s] != expected:
            errors.append(
                f'Season {s:02d}: expected {expected}; '
                f'found {counts[s]}'
            )

        imgdir = IMAGE_ROOT / f'season-{s:02d}'
        pagedir = (
            SEASON_ROOT
            / f'season-{s:02d}'
            / 'roadmaps'
        )

        if not imgdir.is_dir():
            errors.append(f'Missing image directory: {imgdir}')

        if not pagedir.is_dir():
            errors.append(f'Missing page directory: {pagedir}')

    for old in SEASON_ROOT.glob('season-*/images'):
        errors.append(f'Obsolete V2 directory present: {old}')

    return report(errors, len(records), args.allow_missing_images)


def report(errors, count=None, allow=False):
    if errors:
        print('VALIDATION FAILED')
        for e in errors:
            print(' - ' + e)
        return 1

    print('VALIDATION PASSED')
    print(f' - Roadmap records: {count}')
    print(' - Seasons: 10')
    print(' - Image root: site/roadmaps/assets/roadmap-images/season-XX/')
    print(' - Page root: site/roadmaps/seasons/season-XX/roadmaps/')
    print(
        ' - Image binaries: '
        + (
            'not required (--allow-missing-images)'
            if allow
            else 'WebP present'
        )
    )

    return 0


if __name__ == '__main__':
    sys.exit(main())