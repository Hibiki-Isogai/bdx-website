# Pre-Deploy Backup (2026-04-28)

## Purpose
Production site backup taken before deploying the recruitment-graduate redesign.

## Contents
- `recruitment-graduate/` - All 5 pages (top, internship, career, selection, voices)
- `index.html` - Production top page (for comparison)
- `about.html` - About page (for comparison)
- `service.html` - Service page (for comparison)

## Recovery
If rollback is needed, upload the files in `recruitment-graduate/` to the production server via FTP:
```
server: tanbear66.sakura.ne.jp
server-dir: /home/tanbear66/www/recruitment-graduate/
```

## File hashes (md5)
```
3c8d1f052d6fe61a50fe1bd98dfcf738  recruitment-graduate/career/index.html
0b96ffb8eb66aa5563f4c6b546aab987  recruitment-graduate/internship/index.html
a0607d14b33b66618e88237fbf537f1a  recruitment-graduate/selection/index.html
631cd93e6abb51bbf6072d492fbe52fe  recruitment-graduate/voices/index.html
4e5da0b23dbdb1c0dbd8f20ac2b6de63  recruitment-graduate/index.html
```
